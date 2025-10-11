"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import styles from "@/styles/pages/carinsurance.module.css";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";


// ✅ Import dialogs
import ChoosecarDialog from "./Location";
import VehicleBrandDialog from "./Carbrand";
import VehicleModelDialog from "./Carmodel";
import VehicleVariantDialog from "./CarVariant";
import VehicleInfoDialog from "./CarInfoDialog";
import SelectFuelType from "./Selectfueltype";

function Carinsurance() {
  const router = useRouter();
  const [carNumber, setCarNumber] = useState("");
  const [step, setStep] = useState<
    | "none"
    | "chooseVehicle"
    | "chooseBrand"
    | "chooseModel"
    | "selectfueltype"
    | "chooseVariant"
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

   // AOS animation
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
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
        <div className={styles.bottom} data-aos="fade-left">
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

      {/* Dialogs */}
      {step === "chooseVehicle" && (
        <ChoosecarDialog
          onClose={() => setStep("none")}
          onSelectVehicle={(vehicle) => {
            setSelectedVehicle(vehicle);
            setSelectedBrand(null);
            setSelectedModel(null);
            setSelectedFuel(null);
            setSelectedVariant(null);
            setStep("chooseBrand");
          }}
          onBackToInfo={() => setStep("none")}
          onNextToBrand={() => setStep("chooseBrand")}
        />
      )}

      {step === "chooseBrand" && (
        <VehicleBrandDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setSelectedModel(null);
            setSelectedFuel(null);
            setSelectedVariant(null);
            setStep("chooseModel");
          }}
          onBackToChooseVehicle={() => setStep("chooseVehicle")}
          onNextToVehicleModel={() => setStep("chooseModel")}
        />
      )}

      {step === "chooseModel" && (
        <VehicleModelDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setSelectedFuel(null);
            setSelectedVariant(null);
            setStep("selectfueltype");
          }}
          onBack={() => setStep("chooseBrand")}
          onNext={() => setStep("selectfueltype")}
        />
      )}

      {step === "selectfueltype" && (
        <SelectFuelType
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          selectedModel={selectedModel || ""}
          selectedVariant={selectedVariant || ""}
          selectedFuel={selectedFuel || ""}
          onBackToModel={() => setStep("chooseModel")}
          onSelectFuel={(fuel) => {
            setSelectedFuel(fuel);
            setStep("chooseVariant");
          }}
          onNextToVariant={() => setStep("chooseVariant")}
        />
      )}

      {step === "chooseVariant" && (
        <VehicleVariantDialog
          onClose={() => setStep("none")}
          vehicleNumber={carNumber || "NEW VEHICLE"}
          selectedVehicle={selectedVehicle || ""}
          selectedBrand={selectedBrand || ""}
          selectedModel={selectedModel || ""}
          selectedFuel={selectedFuel || ""}
          onBackToModel={() => setStep("selectfueltype")}
          onSelectVariant={(variant) => {
            setSelectedVariant(variant);
            setStep("vehicleInfo");
          }}
        />
      )}

      {step === "vehicleInfo" && (
        <VehicleInfoDialog
          onClose={() => setStep("none")}
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
          oncommercialvehicle1={() => setStep("chooseVehicle")}
          onChooseVehicle={() => setStep("chooseBrand")}
          onChooseBrand={() => setStep("chooseModel")}
          onChooseModel={() => setStep("selectfueltype")}
          onChooseFuelVariant={() => setStep("chooseVariant")}
          onChooseYear={() => {}}
          selectedYear={null}
        />
      )}
    </div>
  );
}

export default Carinsurance;
