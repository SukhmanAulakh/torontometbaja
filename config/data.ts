import anmolImg from "../resources/headshots/anmol-linkedin.png";
import aserImg from "../resources/headshots/aser-linkedin.png";
import sukhmanImg from "../resources/headshots/sukhmanjot-linkedin.png";
import jasmanImg from "../resources/headshots/jasman-linkedin.png";
import kheirthanImg from "../resources/headshots/kheirthan-linkedin.png";
import danielImg from "../resources/headshots/daniel-linkedin.png";
import amrajImg from "../resources/headshots/amraj-linkedin.png";
import suhaibImg from "../resources/headshots/suhaib-linkedin.png";

import solidworksImg from "../resources/sponsors/solidworks.webp";
import briggsImg from "../resources/sponsors/briggs.webp";
import tmuImg from "../resources/sponsors/TMU.webp";
import cvtechImg from "../resources/sponsors/CVTech.webp";
import wilwoodImg from "../resources/sponsors/wilwood.webp";
import vr3Img from "../resources/sponsors/vr3.webp";
import solidcamImg from "../resources/sponsors/solidcam.webp";
import mondayImg from "../resources/sponsors/monday.webp";
import slabImg from "../resources/sponsors/slab.webp";
import muesImg from "../resources/sponsors/MUES.webp";

import lavalImg from "../resources/LavalBaja201942.jpg";
import carImg from "../resources/car.png";
import car2Img from "../resources/car2.png";
import weldingImg from "../resources/welding.png";
import workshopImg from "../resources/welding_workshop2.jpg";
import bannerImg from "../resources/banner.png";

export const teamMembers = [
  {
    name: "Anmol Singh Pabla",
    role: "Co-Captain | Suspension Lead",
    bio: "Co-leading the team towards victory with a focus on suspension dynamics.",
    imageUrl: anmolImg.src,
  },
  {
    name: "Aser Shiferaw",
    role: "Co-Captain | Chassis Lead",
    bio: "Ensuring structural integrity and team cohesion as Co-Captain.",
    imageUrl: aserImg.src,
  },
  {
    name: "Sukhmanjot Aulakh",
    role: "Electrical Lead",
    bio: "Powering the sensors and data acquisition systems.",
    imageUrl: sukhmanImg.src,
  },
  {
    name: "Jasman Singh",
    role: "Vehicle Dynamics Lead",
    bio: "Optimizing handling and performance on the track.",
    imageUrl: jasmanImg.src,
  },
  {
    name: "Kheirthan Vaigunthan",
    role: "Powertrain Lead",
    bio: "Driving the force behind the wheels.",
    imageUrl: kheirthanImg.src,
  },
  {
    name: "Daniel Chirichella",
    role: "Welding & Operations Lead",
    bio: "Mastering the art of fabrication and team operations.",
    imageUrl: danielImg.src,
  },
  {
    name: "Amraj Grewal",
    role: "Human Factors Lead",
    bio: "Designing for driver ergonomics and safety.",
    imageUrl: amrajImg.src,
  },
  {
    name: "Suhaib Momin",
    role: "Chassis Lead",
    bio: "Designing the frame that protects our driver.",
    imageUrl: suhaibImg.src,
  },
];

export const sponsors = [
  {
    name: "SolidWorks",
    tier: "Platinum",
    logoUrl: solidworksImg.src,
    website: "https://www.solidworks.com/",
  },
  {
    name: "Briggs & Stratton",
    tier: "Platinum",
    logoUrl: briggsImg.src,
    website: "https://www.briggsandstratton.com/",
  },
  {
    name: "TMU FEAS",
    tier: "Platinum",
    logoUrl: tmuImg.src,
    website: "https://www.torontomu.ca/engineering-architectural-science/",
  },
  {
    name: "CVTech-AAB",
    tier: "Gold",
    logoUrl: cvtechImg.src,
    website: "#",
  },
  {
    name: "Wilwood Engineering",
    tier: "Gold",
    logoUrl: wilwoodImg.src,
    website: "https://www.wilwood.com/",
  },
  {
    name: "VR3 Engineering",
    tier: "Silver",
    logoUrl: vr3Img.src,
    website: "https://vr3.ca/",
  },
  {
    name: "SolidCAM",
    tier: "Silver",
    logoUrl: solidcamImg.src,
    website: "https://www.solidcam.com/",
  },
  {
    name: "Monday.com",
    tier: "Bronze",
    logoUrl: mondayImg.src,
    website: "https://monday.com/",
  },
  {
    name: "Slab",
    tier: "Bronze",
    logoUrl: slabImg.src,
    website: "https://slab.com/",
  },
  {
    name: "MUES",
    tier: "Bronze",
    logoUrl: muesImg.src,
    website: "https://www.mues.ca/",
  },
];

export const galleryImages = [
  {
    id: "1",
    src: lavalImg.src,
    alt: "Race Day 2024",
    caption: "The team at the starting line.",
  },
  {
    id: "2",
    src: workshopImg.src,
    alt: "Late night workshop",
    caption: "Final adjustments before the competition.",
  },
  {
    id: "3",
    src: carImg.src,
    alt: "Testing Phase",
    caption: "Suspension testing on rough terrain.",
  },
  {
    id: "4",
    src: weldingImg.src,
    alt: "Chassis Welding",
    caption: "Precision welding on the main frame.",
  },
  {
    id: "5",
    src: car2Img.src,
    alt: "Team Photo",
    caption: "The 2024 Toronto Met Baja Team.",
  },
  {
    id: "6",
    src: bannerImg.src,
    alt: "Engine Tuning",
    caption: "Fine-tuning the transmission.",
  },
];

export const aboutContent = {
  mission:
    "Our mission is to create an enriching environment for students to grow, learn, and prepare for work in industry. We strive to provide unparalleled hands-on learning experiences that bridge the gap between classroom theory and real-world engineering.",
  vision:
    "To become a top-tier competitor in the Baja SAE series, recognized not only for our vehicle's performance but also for the excellence and professionalism of our members.",
  history:
    "Established in 1983, Toronto Met Baja Racing (formerly Ryerson Baja) is the oldest engineering design team at Toronto Metropolitan University. From a small group of enthusiasts, we have grown into a multidisciplinary team of over 75 members across 7 sub-teams. Over the decades, we have competed across North America, constantly pushing the boundaries of durability, performance, and student innovation.",
};

export const subteams = [
  {
    name: "Chassis",
    description: "The backbone of the vehicle. This team designs and manufactures the steel roll cage that protects the driver.",
    learn: ["SolidWorks FEA & Simulation", "Tube Notching & Welding", "Structural Analysis", "Jigging & Fabrication"]
  },
  {
    name: "Suspension",
    description: "Responsible for connecting the car to the ground. They design the shocks, arms, and geometry to handle rough terrain.",
    learn: ["Kinematics & Dynamics", "Shock Tuning", "Component Design", "Unsprung Mass Optimization"]
  },
  {
    name: "Powertrain",
    description: "The heart of the car. This team deals with the engine, CVT, and custom gearbox to transfer power efficiently.",
    learn: ["Gearbox Design", "CVT Tuning", "Engine Maintenance", "Machining (Lathe/Mill)"]
  },
  {
    name: "Electrical",
    description: "The nervous system. They manage the data acquisition (DAQ), sensors, wiring harness, and brake light systems.",
    learn: ["PCB Design", "Microcontrollers (Arduino/STM32)", "Wiring & Soldering", "Data Analysis"]
  },
  {
    name: "Brakes & Controls",
    description: "Stopping power and driver inputs. This team designs the hydraulic brake system and pedal assembly.",
    learn: ["Hydraulic Systems", "Ergonomic Design", "Fluid Dynamics", "CNC Machining"]
  },
  {
    name: "Business & Media",
    description: "The fuel for the team. They handle sponsorships, finances, social media, and competition logistics.",
    learn: ["Grant Writing & Pitching", "Social Media Marketing", "Budgeting", "Project Management"]
  }
];
