"use client";
import React, { useState } from "react";
import styles from "@/styles/pages/CommercialVehicle/commercialvehicle1.module.css";
import Image from "next/image";
import vehicle from "@/assets/CommercialVehicle/Layer 1.png";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import VehicleInfoDialog from "@/pages/CommercialVehicle/VehicleInfoDialog";
import ChooseVehicleDialog from "@/pages/CommercialVehicle/ChooseVehicleDialog";
import VehicleBrandDialog from "@/pages/CommercialVehicle/VehicleBrandDialog";
import VehicleModelDialog from "@/pages/CommercialVehicle/VehicleModelDialog";
import VehicleVariantDialog from "@/pages/CommercialVehicle/VehicleVariantDialog";
import YearDialog from "@/pages/CommercialVehicle/YearDialog";
import SelectionFormDialog from "@/pages/CommercialVehicle/SelectionFormDialog";
import CommercialVehicle5 from "@/pages/CommercialVehicle/CommercialVehicle5";


const CommercialVehicle1: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    | "vehicleInfo"
    | "chooseVehicle"
    | "vehicleBrand"
    | "vehicleModel"
    | "vehicleVariant"
    | "yearDialog"
    | "selectionForm"
     |"plan"
    | null
  >(null);

  // ✅ Selection states
  const [vehicleNumber, setVehicleNumber] = useState("DL01LAG8279");
  const [selectedVehicle, setSelectedVehicle] = useState("Truck");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* Main Section */}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Left Section */}
          <div className={styles.left}>
            <span className={styles.badge}>GET POLICY IN 2 MINUTES</span>
            <h2 className={styles.title}>
              Commercial Vehicle Insurance <br />
              starting at <span className={styles.price}>₹3,139</span>
            </h2>
            <input
              type="text"
              placeholder="Enter Vehicle Number: (eg. DL-10-CB-1234)"
              className={styles.input}
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
            <p className={styles.linkText}>
              Brand new vehicle? <a href="#">Click here</a>
            </p>
          </div>

          {/* Right Section */}
          <div className={styles.right}>
            <Image src={vehicle} alt="Commercial Vehicle" className={styles.truckImg} />
            <button className={styles.button} onClick={() => setActiveSection("vehicleInfo")}>
              View Prices
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Handling */}
      {activeSection === "vehicleInfo" && (
        <VehicleInfoDialog
          onClose={() => setActiveSection(null)}
          onChooseVehicle={() => setActiveSection("chooseVehicle")}
        />
      )}

      {activeSection === "chooseVehicle" && (
        <ChooseVehicleDialog
          onClose={() => setActiveSection(null)}
          onSelectVehicle={(vehicle) => {
            setSelectedVehicle(vehicle);
            setActiveSection("vehicleBrand");
          }}
        />
      )}

      {activeSection === "vehicleBrand" && (
        <VehicleBrandDialog
          onClose={() => setActiveSection(null)}
          vehicleNumber={vehicleNumber}
          selectedVehicle={selectedVehicle}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setActiveSection("vehicleModel");
          }}
        />
      )}

      {activeSection === "vehicleModel" && selectedBrand && (
        <VehicleModelDialog
          onClose={() => setActiveSection(null)}
          vehicleNumber={vehicleNumber}
          selectedVehicle={selectedVehicle}
          selectedBrand={selectedBrand}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setActiveSection("vehicleVariant");
          }}
        />
      )}

      {activeSection === "vehicleVariant" && selectedBrand && selectedModel && (
        <VehicleVariantDialog
          onClose={() => setActiveSection(null)}
          vehicleNumber={vehicleNumber}
          selectedVehicle={selectedVehicle}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          onSelectVariant={(variant) => {
            setSelectedVariant(variant);
            setActiveSection("yearDialog");
          }}
        />
      )}

      {activeSection === "yearDialog" &&
        selectedBrand &&
        selectedModel &&
        selectedVariant && (
          <YearDialog
            onClose={() => setActiveSection(null)}
            vehicleNumber={vehicleNumber}
            selectedVehicle={selectedVehicle}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedVariant={selectedVariant}
            onSelectYear={(year) => {
              setSelectedYear(year);
              setActiveSection("selectionForm"); 
            }}
          />
        )}

      {activeSection === "selectionForm" &&
        selectedBrand &&
        selectedModel &&
        selectedVariant &&
        selectedYear && (
          <SelectionFormDialog
            onClose={() => setActiveSection(null)}
            vehicleNumber={vehicleNumber}
            selectedVehicle={selectedVehicle}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedVariant={selectedVariant}
            selectedYear={selectedYear}
          />
        )}
  <Footer/>
    </>
  );
};

export default CommercialVehicle1;
