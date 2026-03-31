"use client";

import { title } from "@/components/primitives";
import { useEffect, useState, useCallback, useRef } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { VolumeHighIcon, VolumeMuteIcon } from "@/components/icons";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { eventDates } from "@/config/data";
import { fetchGalleryImages, fetchGalleryFolders, fetchFolderImages } from "@/lib/google-drive";

const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
};

const parseManualDate = (dateStr) => {
    if (!dateStr) return 0;
    const parts = dateStr.split(' ');
    if (parts.length < 2) return 0;
    const month = monthMap[parts[0]] ?? 0;
    const year = parseInt(parts[1]);
    if (isNaN(year)) return 0;
    return new Date(year, month).getTime();
};

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // Folder state
    const [folders, setFolders] = useState([]);
    const [foldersLoading, setFoldersLoading] = useState(true);

    // Video Audio Logic
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.1; // Low volume
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay with sound blocked
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        setIsMuted(true);
                        videoRef.current.play();
                    }
                });
            }
        }
    }, []);

    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newState = !videoRef.current.muted;
            videoRef.current.muted = newState;
            setIsMuted(newState);
            if (!newState) {
                videoRef.current.volume = 0.1;
            }
        }
    };
    const [folderImages, setFolderImages] = useState({});
    const [loadingFolders, setLoadingFolders] = useState({});
    const [loadingMoreFolders, setLoadingMoreFolders] = useState({});

    // Lightbox State
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeImageSet, setActiveImageSet] = useState([]);
    const [activeFolderId, setActiveFolderId] = useState(null); // 'global' or folder.id
    const [isWaitingForNext, setIsWaitingForNext] = useState(false);

    // Fixed height for waffle layout
    const FIXED_HEIGHT = 300;

    // Infinite Scroll Implementation
    const [hasMore, setHasMore] = useState(true);

    // Initial load
    useEffect(() => {
        const fetchInitialImages = async () => {
            try {
                const data = await fetchGalleryImages();
                if (data.images) {
                    setImages(data.images);
                    setNextPageToken(data.nextPageToken);
                    setHasMore(!!data.nextPageToken);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialImages();
    }, []);

    // Fetch folders
    useEffect(() => {
        const loadFolders = async () => {
            try {
                const data = await fetchGalleryFolders();
                if (data.folders) {
                    // Sort folders based on manual dates (descending - newest first)
                    const sortedFolders = [...data.folders].sort((a, b) => {
                        const dateA = parseManualDate(eventDates[a.name]);
                        const dateB = parseManualDate(eventDates[b.name]);
                        return dateB - dateA;
                    });
                    setFolders(sortedFolders);
                }
            } catch (error) {
                console.error("Failed to fetch folders", error);
            } finally {
                setFoldersLoading(false);
            }
        };

        loadFolders();
    }, []);

    // Load images for a specific folder when accordion is expanded
    const loadFolderImagesHandler = async (folderId) => {
        // Don't reload if already loaded
        if (folderImages[folderId]) return;

        setLoadingFolders(prev => ({ ...prev, [folderId]: true }));
        try {
            const data = await fetchFolderImages(folderId);
            if (data.images) {
                // Store images AND the next page token
                setFolderImages(prev => ({
                    ...prev,
                    [folderId]: {
                        images: data.images,
                        nextPageToken: data.nextPageToken || null
                    }
                }));
            }
        } catch (error) {
            console.error(`Failed to fetch images for folder ${folderId}`, error);
        } finally {
            setLoadingFolders(prev => ({ ...prev, [folderId]: false }));
        }
    };

    const loadMoreFolderImages = async (folderId) => {
        const folderData = folderImages[folderId];
        if (!folderData || !folderData.nextPageToken || loadingMoreFolders[folderId]) return;

        setLoadingMoreFolders(prev => ({ ...prev, [folderId]: true }));
        try {
            const data = await fetchFolderImages(folderId, folderData.nextPageToken);

            if (data.images) {
                setFolderImages(prev => ({
                    ...prev,
                    [folderId]: {
                        images: [...prev[folderId].images, ...data.images],
                        nextPageToken: data.nextPageToken || null
                    }
                }));
            }
        } catch (error) {
            console.error(`Failed to load more images for folder ${folderId}`, error);
        } finally {
            setLoadingMoreFolders(prev => ({ ...prev, [folderId]: false }));
        }
    };

    // Fetch more images
    const loadMoreImages = useCallback(async () => {
        if (!nextPageToken || isFetchingMore || !hasMore) return;

        setIsFetchingMore(true);
        try {
            const data = await fetchGalleryImages(nextPageToken);

            if (data.images && data.images.length > 0) {
                setImages(prev => [...prev, ...data.images]);
                setNextPageToken(data.nextPageToken);
                setHasMore(!!data.nextPageToken);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Failed to load more images", error);
        } finally {
            setIsFetchingMore(false);
        }
    }, [nextPageToken, isFetchingMore, hasMore]);

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
                    loadMoreImages();
                }
            },
            { threshold: 0.1, rootMargin: "100px" } // Trigger when nearing the button
        );

        const target = document.getElementById("load-more-trigger");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [loadMoreImages, hasMore, isFetchingMore]);


    // Sync activeImageSet whenever source data changes while lightbox is open
    useEffect(() => {
        if (!isOpen) {
            setActiveFolderId(null);
            setIsWaitingForNext(false);
            return;
        }

        if (activeFolderId === 'global') {
            setActiveImageSet(images);
        } else if (activeFolderId && folderImages[activeFolderId]) {
            setActiveImageSet(folderImages[activeFolderId].images);
        }
    }, [isOpen, activeFolderId, images, folderImages]);

    // Advance lightbox once data is loaded if we were waiting
    useEffect(() => {
        if (isWaitingForNext && selectedIndex !== null) {
            // If more images were loaded
            if (selectedIndex < activeImageSet.length - 1) {
                const nextIdx = selectedIndex + 1;
                setSelectedIndex(nextIdx);
                setSelectedImage(activeImageSet[nextIdx]);
                setIsWaitingForNext(false);
            }
        }
    }, [isWaitingForNext, selectedIndex, activeImageSet]);

    const handleImageClick = (image, index, folderId = 'global') => {
        setActiveFolderId(folderId);
        // Initial set - will be kept in sync by the useEffect above
        const initialSet = folderId === 'global' ? images : folderImages[folderId].images;
        setActiveImageSet(initialSet);
        setSelectedImage(image);
        setSelectedIndex(index);
        setIsOpen(true);
    };

    // Sync background scroll with lightbox traversal
    useEffect(() => {
        if (!isOpen || !selectedImage || !activeFolderId) return;

        const targetId = `thumb-${activeFolderId}-${selectedImage.id}`;
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isOpen, selectedImage, activeFolderId]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setSelectedImage(null);
            setSelectedIndex(null);
        }, 300);
    };

    const handlePrev = useCallback(() => {
        if (selectedIndex === null || activeImageSet.length === 0) return;
        const newIndex = (selectedIndex - 1 + activeImageSet.length) % activeImageSet.length;
        setSelectedIndex(newIndex);
        setSelectedImage(activeImageSet[newIndex]);
    }, [selectedIndex, activeImageSet]);

    const handleNext = useCallback(() => {
        if (selectedIndex === null || activeImageSet.length === 0) return;

        // If we are at the last image and there's more to load
        if (selectedIndex === activeImageSet.length - 1) {
            if (activeFolderId === 'global' && hasMore) {
                setIsWaitingForNext(true);
                loadMoreImages();
                return;
            } else if (activeFolderId && activeFolderId !== 'global' && folderImages[activeFolderId]?.nextPageToken) {
                setIsWaitingForNext(true);
                loadMoreFolderImages(activeFolderId);
                return;
            }
        }

        const newIndex = (selectedIndex + 1) % activeImageSet.length;
        setSelectedIndex(newIndex);
        setSelectedImage(activeImageSet[newIndex]);
    }, [selectedIndex, activeImageSet, activeFolderId, hasMore, folderImages, loadMoreImages]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handlePrev, handleNext]);

    // Handle accordion selection change to load images
    const handleSelectionChange = (keys) => {
        // keys is a Set of selected keys (folder IDs)
        keys.forEach(key => {
            loadFolderImagesHandler(key);
        });
    };

    return (
        <div className="flex flex-col gap-0 w-full relative">
            {/* Hero Video Section - Fixed Background */}
            <div className="fixed top-16 left-0 w-full z-0 pointer-events-none">
                <div className="relative w-full aspect-video max-h-screen overflow-hidden">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover filter scale-105"
                        src="/winter2026jump.MOV"
                        muted={false}
                        playsInline
                        onEnded={handleVideoEnded}
                    />
                </div>
            </div>

            {/* Spacer to push content down - matching video aspect ratio - contains scrolling overlay */}
            <div className="w-full aspect-video h-full relative pointer-events-none z-10">
                {/* Overlay Content - Scrolling with Spacer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
                    <h1 className={title({ class: "!text-4xl md:!text-6xl text-white drop-shadow-lg" })}>Gallery</h1>
                    <p className="mt-4 text-xl text-white/90 font-medium drop-shadow-md">
                        TMU Baja SAE's Photo and Video Gallery
                    </p>
                </div>

                {/* Mute Button - Scrolling with Spacer */}
                <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
                    <Button
                        isIconOnly
                        variant="flat"
                        className="bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md"
                        onPress={toggleMute}
                    >
                        {isMuted ? <VolumeMuteIcon /> : <VolumeHighIcon />}
                    </Button>
                </div>
            </div>

            {/* Main Content - Relative to scroll over fixed video */}
            <div className="relative z-10 bg-background w-full">
                <div className="container mx-auto max-w-[80vw] flex flex-col gap-8 py-8 md:py-10 px-6 w-full">
                    {/* Event Folders Accordion */}
                    {!foldersLoading && folders.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Events</h2>
                            <Accordion
                                variant="splitted"
                                onSelectionChange={handleSelectionChange}
                            >
                                {folders.map((folder) => (
                                    <AccordionItem
                                        key={folder.id}
                                        aria-label={folder.name}
                                        title={
                                            <div className="flex items-center gap-3">
                                                {folder.coverImage ? (
                                                    <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={folder.coverImage}
                                                            alt={folder.name}
                                                            className="w-full h-full object-cover !opacity-100"
                                                            width={48}
                                                            height={48}
                                                            referrerPolicy="no-referrer"
                                                            onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-default-200 flex items-center justify-center flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-default-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div className="flex flex-col text-left">
                                                    <span className="text-medium font-semibold">{folder.name}</span>
                                                    <span className="text-small text-default-500">{folder.count || 0} items</span>
                                                </div>
                                                <div className="flex-grow"></div>
                                                {eventDates[folder.name] && (
                                                    <span className="text-small text-default-400 font-medium pr-4">
                                                        {eventDates[folder.name]}
                                                    </span>
                                                )}
                                            </div>
                                        }
                                    >
                                        {loadingFolders[folder.id] ? (
                                            <div className="flex justify-center items-center py-10">
                                                <Spinner size="lg" label="Loading images..." />
                                            </div>
                                        ) : folderImages[folder.id] ? (
                                            <div className="flex flex-col gap-4 w-full items-center py-4">
                                                <div className="flex flex-wrap gap-4 w-full justify-center">
                                                    {folderImages[folder.id].images.map((image, idx) => {
                                                        const aspectRatio = image.width && image.height ? image.width / image.height : 1;
                                                        const cardWidth = FIXED_HEIGHT * aspectRatio;

                                                        return (
                                                            <Card
                                                                id={`thumb-${folder.id}-${image.id}`}
                                                                key={image.id}
                                                                isPressable
                                                                onPress={() => handleImageClick(image, idx, folder.id)}
                                                                radius="none"
                                                                className="border-none bg-transparent shadow-sm overflow-hidden"
                                                                style={{ height: `${FIXED_HEIGHT}px`, width: `${cardWidth}px` }}
                                                            >
                                                                <div className="relative w-full h-full">
                                                                    <Image
                                                                        alt={image.alt}
                                                                        className={`h-full w-full ${image.mimeType?.includes('video') ? 'object-contain' : 'object-cover'} transition-transform duration-300 hover:scale-105 !opacity-100`}
                                                                        src={image.src}
                                                                        style={{ height: `${FIXED_HEIGHT}px`, width: `${cardWidth}px` }}
                                                                        referrerPolicy="no-referrer"
                                                                        loading="lazy"
                                                                        onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                                                                    />
                                                                    {image.mimeType && image.mimeType.includes('video') && (
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors z-10 pointer-events-none">
                                                                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Card>
                                                        );
                                                    })}
                                                </div>

                                                {folderImages[folder.id].nextPageToken && (
                                                    <Button
                                                        variant="flat"
                                                        color="primary"
                                                        isLoading={loadingMoreFolders[folder.id]}
                                                        onPress={() => loadMoreFolderImages(folder.id)}
                                                        className="mt-4"
                                                    >
                                                        Load More
                                                    </Button>
                                                )}
                                            </div>
                                        ) : null}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}

                    {/* Main Gallery Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold">All Photos</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Spinner size="lg" label="Loading images..." />
                        </div>
                    ) : (
                        <>
                            {/* Waffle Layout */}
                            <div className="flex flex-wrap gap-4 w-full justify-center">
                                {images.map((image, index) => {
                                    const aspectRatio = image.width && image.height ? image.width / image.height : 1;
                                    const cardWidth = FIXED_HEIGHT * aspectRatio;

                                    return (
                                        <Card
                                            id={`thumb-global-${image.id}`}
                                            key={image.id}
                                            isPressable
                                            onPress={() => handleImageClick(image, index, 'global')}
                                            radius="none"
                                            className="border-none bg-transparent shadow-sm overflow-hidden"
                                            style={{ height: `${FIXED_HEIGHT}px`, width: `${cardWidth}px` }}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    alt={image.alt}
                                                    className={`h-full w-full ${image.mimeType?.includes('video') ? 'object-contain' : 'object-cover'} transition-transform duration-300 hover:scale-105 !opacity-100`}
                                                    src={image.src}
                                                    style={{ height: `${FIXED_HEIGHT}px`, width: `${cardWidth}px` }}
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                    onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                                                />
                                                {image.mimeType && image.mimeType.includes('video') && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors z-10 pointer-events-none">
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                            {/* Load More Button / Trigger element for Infinite Scroll */}
                            {hasMore && (
                                <div id="load-more-trigger" className="flex justify-center items-center w-full mt-12 pb-24">
                                    <Button
                                        variant="flat"
                                        color="primary"
                                        isLoading={isFetchingMore}
                                        onPress={loadMoreImages}
                                        className="min-w-[200px] font-semibold"
                                        size="lg"
                                    >
                                        Load More
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Lightbox Modal */}
                    <Modal
                        isOpen={isOpen}
                        onClose={handleClose}
                        size="full"
                        backdrop="blur"
                        classNames={{
                            base: "bg-transparent shadow-none",
                            header: "border-b-0",
                            body: "p-0 bg-transparent shadow-none",
                            closeButton: "hover:bg-white/5 active:bg-white/10 text-white z-50 top-4 right-4",
                        }}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <ModalBody className="relative flex items-center justify-center h-full w-full">

                                    <Button
                                        isIconOnly
                                        variant="flat"
                                        className="absolute left-4 z-50 text-white bg-black/20 hover:bg-black/40 hidden sm:flex"
                                        onPress={handlePrev}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </Button>

                                    {/* Folder Info and Counter Overlay */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none">
                                        <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/90 font-semibold text-sm">
                                                    {activeFolderId === 'global' ? 'All Photos' : (folders.find(f => f.id === activeFolderId)?.name || 'Event')}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-white/30"></div>
                                                <span className="text-white/70 font-medium text-xs font-mono">
                                                    {(selectedIndex ?? 0) + 1} / {activeFolderId === 'global' ? (folders.reduce((acc, f) => acc + (f.count || 0), 0) || activeImageSet.length) : (folders.find(f => f.id === activeFolderId)?.count || activeImageSet.length)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedImage && (
                                        <div className="relative group max-w-[90%] max-h-[90%] flex justify-center items-center w-full h-full">
                                            {selectedImage.mimeType && selectedImage.mimeType.includes('video') ? (
                                                <iframe
                                                    src={`https://drive.google.com/file/d/${selectedImage.id}/preview`}
                                                    className="max-h-[80vh] w-auto max-w-[90vw] border-none rounded-lg shadow-2xl"
                                                    style={{
                                                        aspectRatio: selectedImage.width && selectedImage.height ? `${selectedImage.width} / ${selectedImage.height}` : '16 / 9'
                                                    }}
                                                    allow="autoplay"
                                                    title={selectedImage.alt}
                                                />
                                            ) : (
                                                <Image
                                                    src={selectedImage.src}
                                                    alt={selectedImage.alt}
                                                    className="max-h-[85vh] w-auto max-w-[90vw] object-contain rounded-lg shadow-2xl !opacity-100"
                                                    referrerPolicy="no-referrer"
                                                    onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                                                />
                                            )}

                                            {/* Caption Overlay - Hidden as requested */}
                                        </div>
                                    )}

                                    {/* Next Button */}
                                    <Button
                                        isIconOnly
                                        variant="flat"
                                        isLoading={isWaitingForNext}
                                        className="absolute right-4 z-50 text-white bg-black/20 hover:bg-black/40 hidden sm:flex"
                                        onPress={handleNext}
                                    >
                                        {!isWaitingForNext && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        )}
                                    </Button>

                                </ModalBody>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
