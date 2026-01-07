"use client";

import { title } from "@/components/primitives";
import { useEffect, useState, useCallback } from "react";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [columns, setColumns] = useState({ col1: [], col2: [], col3: [] });
    const [columnCount, setColumnCount] = useState(3);

    // Lightbox State
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Detect screen size and set column count
    useEffect(() => {
        const updateColumnCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setColumnCount(1);
            } else if (width < 1024) {
                setColumnCount(2);
            } else {
                setColumnCount(3);
            }
        };

        updateColumnCount();
        window.addEventListener('resize', updateColumnCount);
        return () => window.removeEventListener('resize', updateColumnCount);
    }, []);

    // Distribute images across columns sequentially
    const distributeImages = useCallback((imagesToDistribute, existingColumns, startIndex = 0) => {
        const newColumns = { ...existingColumns };
        const colKeys = ['col1', 'col2', 'col3'];

        imagesToDistribute.forEach((image, idx) => {
            const columnIndex = (startIndex + idx) % columnCount;
            const colKey = colKeys[columnIndex];
            if (newColumns[colKey]) {
                newColumns[colKey] = [...newColumns[colKey], image];
            }
        });

        return newColumns;
    }, [columnCount]);

    // Redistribute all images when column count changes
    useEffect(() => {
        if (images.length > 0) {
            const newColumns = { col1: [], col2: [], col3: [] };
            setColumns(distributeImages(images, newColumns, 0));
        }
    }, [columnCount, images, distributeImages]);

    // Initial load
    useEffect(() => {
        const fetchInitialImages = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                if (data.images) {
                    setImages(data.images);
                    setNextPageToken(data.nextPageToken);
                }
            } catch (error) {
                console.error("Failed to fetch gallery images", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialImages();
    }, []);

    // Fetch more images
    const loadMoreImages = useCallback(async () => {
        if (!nextPageToken || isFetchingMore) return;

        setIsFetchingMore(true);
        try {
            const res = await fetch(`/api/gallery?nextPageToken=${nextPageToken}`);
            const data = await res.json();

            if (data.images) {
                setImages(prev => [...prev, ...data.images]);
                setNextPageToken(data.nextPageToken);
            }
        } catch (error) {
            console.error("Failed to load more images", error);
        } finally {
            setIsFetchingMore(false);
        }
    }, [nextPageToken, isFetchingMore]);

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreImages();
                }
            },
            { threshold: 1.0 }
        );

        const target = document.getElementById("load-more-trigger");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [loadMoreImages]);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setSelectedImage(null);
            setSelectedIndex(null);
        }, 300);
    };

    const handlePrev = useCallback(() => {
        if (selectedIndex === null || images.length === 0) return;
        const newIndex = (selectedIndex - 1 + images.length) % images.length;
        setSelectedIndex(newIndex);
        setSelectedImage(images[newIndex]);
    }, [selectedIndex, images]);

    const handleNext = useCallback(() => {
        if (selectedIndex === null || images.length === 0) return;
        const newIndex = (selectedIndex + 1) % images.length;
        setSelectedIndex(newIndex);
        setSelectedImage(images[newIndex]);
    }, [selectedIndex, images]);

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

    return (
        <div className="flex flex-col gap-8 py-8 md:py-10">
            <div className="text-center">
                <h1 className={title()}>Gallery</h1>
                <p className="mt-4 text-lg text-default-500">
                    Capture the moment.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spinner size="lg" label="Loading images..." />
                </div>
            ) : (
                <>
                    <div className="flex gap-4 w-full">
                        {/* Column 1 */}
                        {columnCount >= 1 && (
                            <div className="flex-1 flex flex-col gap-4">
                                {columns.col1.map((image) => {
                                    const globalIndex = images.findIndex(img => img.id === image.id);
                                    return (
                                        <div key={image.id} className="break-inside-avoid">
                                            <Card
                                                isPressable
                                                onPress={() => handleImageClick(image, globalIndex)}
                                                radius="lg"
                                                className="border-none w-full h-auto bg-transparent shadow-none"
                                            >
                                                <Image
                                                    alt={image.alt}
                                                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                                                    src={image.src}
                                                    width="100%"
                                                    height="100%"
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                />
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Column 2 */}
                        {columnCount >= 2 && (
                            <div className="flex-1 flex flex-col gap-4">
                                {columns.col2.map((image) => {
                                    const globalIndex = images.findIndex(img => img.id === image.id);
                                    return (
                                        <div key={image.id} className="break-inside-avoid">
                                            <Card
                                                isPressable
                                                onPress={() => handleImageClick(image, globalIndex)}
                                                radius="lg"
                                                className="border-none w-full h-auto bg-transparent shadow-none"
                                            >
                                                <Image
                                                    alt={image.alt}
                                                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                                                    src={image.src}
                                                    width="100%"
                                                    height="100%"
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                />
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Column 3 */}
                        {columnCount >= 3 && (
                            <div className="flex-1 flex flex-col gap-4">
                                {columns.col3.map((image) => {
                                    const globalIndex = images.findIndex(img => img.id === image.id);
                                    return (
                                        <div key={image.id} className="break-inside-avoid">
                                            <Card
                                                isPressable
                                                onPress={() => handleImageClick(image, globalIndex)}
                                                radius="lg"
                                                className="border-none w-full h-auto bg-transparent shadow-none"
                                            >
                                                <Image
                                                    alt={image.alt}
                                                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                                                    src={image.src}
                                                    width="100%"
                                                    height="100%"
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                />
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {/* Trigger element for Infinite Scroll */}
                    <div id="load-more-trigger" className="h-10 flex justify-center items-center w-full">
                        {isFetchingMore && <Spinner size="sm" />}
                    </div>
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

                            {/* Previous Button */}
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

                            {selectedImage && (
                                <div className="relative group max-w-[90%] max-h-[90%] flex justify-center items-center">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        className="max-h-[85vh] w-auto max-w-[90vw] object-contain rounded-lg shadow-2xl"
                                        referrerPolicy="no-referrer"
                                    />

                                    {/* Caption Overlay - Hidden as requested */}
                                </div>
                            )}

                            {/* Next Button */}
                            <Button
                                isIconOnly
                                variant="flat"
                                className="absolute right-4 z-50 text-white bg-black/20 hover:bg-black/40 hidden sm:flex"
                                onPress={handleNext}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Button>

                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
