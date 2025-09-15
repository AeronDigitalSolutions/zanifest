"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import styles from "@/styles/pages/carinsurance.module.css";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";

// ✅ Import dialogs
import ChoosecarDialog from "@/pages/carinsurance/ChooseVehicleDialog";
import VehicleBrandDialog from "@/pages/carinsurance/VehicleBrandDialog";
import VehicleModelDialog from "@/pages/carinsurance/VehicleModelDialog";
import VehicleVariantDialog from "@/pages/carinsurance/VehicleVariant";
import VehicleInfoDialog from "@/pages/carinsurance/VehicleInfoDialog";
import SelectFuelType from "./Selectfueltype";

function Carinsurance() {
  const router = useRouter();
  const [carNumber, setCarNumber] = useState("");
  const [step, setStep] = useState<
    | "none"
    | "chooseVehicle"
    | "chooseBrand"
    | "chooseModel"
    | "chooseVariant"
    | "selectfueltype"
    | "vehicleInfo"
  >("none");

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <UserDetails />
      <Navbar />

      {/* Main Section */}
      <div className={styles.cont}>
        <div className={styles.imageCont}>
          <Image
            src={require("@/assets/pageImages/blackcar.png")}
            alt="car Image"
            className={styles.image}
          />
        </div>
        <div className={styles.bottom}>
          <p className={styles.heading}>
            Compare & <b className={styles.bold}>save upto 90%</b> on car
            insurance
          </p>
          <div className={styles.form}>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
              placeholder="Enter car number (eg - DL-10-CB-1234)"
              className={styles.input}
            />

            <button
              className={styles.button}
              onClick={() => {
                router.push("./carinsurance4");
              }}
            >
              View Prices <FaArrowRight />
            </button>

            <div className={styles.newCar}>
              Brand new car?{" "}
              <button
                onClick={() => setStep("chooseVehicle")}
                className={styles.linkBtn}
              >
                click here
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ✅ Choose Vehicle Dialog */}
      {step === "chooseVehicle" && (
        <ChoosecarDialog
          onClose={() => setStep("none")}
          onSelectVehicle={(vehicle) => {
            setSelectedVehicle(vehicle);
            setStep("chooseBrand");
          }}
          onBackToInfo={() => setStep("none")}
          onNextToBrand={() => setStep("chooseBrand")}
        />
      )}

      {/* ✅ Vehicle Brand Dialog */}
      {step === "chooseBrand" && (
        <VehicleBrandDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          onBackToChooseVehicle={() => setStep("chooseVehicle")}
          onNextToVehicleModel={() => setStep("chooseModel")}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setStep("chooseModel");
          }}
        />
      )}

      {/* ✅ Vehicle Model Dialog */}
      {step === "chooseModel" && (
        <VehicleModelDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          onBack={() => setStep("chooseBrand")}
          onNext={() => setStep("chooseVariant")}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setStep("chooseVariant");
          }}
        />
      )}

      {/* ✅ Vehicle Variant Dialog */}
      {step === "chooseVariant" && (
        <VehicleVariantDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          selectedModel={selectedModel || ""}
          onBackToModel={() => setStep("chooseModel")}
          onNextToYear={() => setStep("selectfueltype")}
          onSelectVariant={(variant: React.SetStateAction<string | null>) => {
            setSelectedVariant(variant);
            setStep("selectfueltype");
          }}
        />
      )}

      {/* ✅ Select Fuel Type */}
      {step === "selectfueltype" && (
        <SelectFuelType
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          selectedModel={selectedModel || ""}
          selectedVariant={selectedVariant || ""}
          selectedFuel={selectedFuel || ""}
          onBackToModel={() => setStep("chooseVariant")}
          onNextToYear={() => setStep("vehicleInfo")}
          onSelectFuel={(fuel) => {
            setSelectedFuel(fuel);
            setStep("vehicleInfo");
          }}
        />
      )}

      {/* ✅ Vehicle Info Dialog */}
      {step === "vehicleInfo" && (
        <VehicleInfoDialog
          onClose={() => setStep("none")}
          oncommercialvehicle1={() => setStep("none")}
          onChooseVehicle={() => setStep("chooseVehicle")}
          onChooseBrand={() => setStep("chooseBrand")}
          onChooseModel={() => setStep("chooseModel")}
          onChooseFuelVariant={() => setStep("chooseVariant")}
          onChooseYear={() => setStep("vehicleInfo")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          selectedVariant={selectedVariant}
          selectedFuel={selectedFuel}
          onUpdateData={(data) => {
            if (data.vehicle) setSelectedVehicle(data.vehicle);
            if (data.brand) setSelectedBrand(data.brand);
            if (data.model) setSelectedModel(data.model);
            if (data.variant) setSelectedVariant(data.variant);
            if (data.fuel) setSelectedFuel(data.fuel);
          }}
          selectedYear={null}
        />
      )}
    </div>
  );
}

export default Carinsurance;
