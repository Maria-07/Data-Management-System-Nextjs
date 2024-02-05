import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAccessToken } from "@/Redux/api/apiSlice";
import axios from "axios";

const AboutPatient = ({ register, patientData, setValue, getValues }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [raceEthnicity, setRaceEthnicity] = useState([]);
  const [preLanguage, setPreLanguage] = useState([]);
  const token = getAccessToken();
  useEffect(() => {
    const getRaceEthnicity = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/race-ethnicity`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
      });
      const data = res?.data?.race_ethnicity;
      //setRaceEthnicity(data);
      let newObj = [];

      for (let [k, v] of Object.entries(data)) {
        newObj[k] = v;
      }
      setRaceEthnicity(newObj);
    };
    getRaceEthnicity();
  }, []);

  useEffect(() => {
    const getPreLanguage = async () => {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_ADMIN_URL}/patient/preferred-language`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token || null,
        },
      });
      const data = res?.data?.preferred_languages;
      setPreLanguage(data);
    };
    getPreLanguage();
  }, []);

  const colorOptions = [
    "#E0EBF5",
    "#FFE8E8",
    "#E5F6EE",
    "#FCEFDC",
    "#B0DDC8",
    "#AACBEE",
    "#FEE9A6",
    "#FBCBC7",
    "#B2EBF2",
    "#C5CAE9",
    "#FFECB3",
    "#D7CCC8",
    "#B3E6CC",
    "#B2DFDB",
    "#FFCDD2",
  ];

  const toggleColorPalette = () => {
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  const handleColorSelection = (color) => {
    setValue("background_color", color);
    setSelectedColor(color);
    setIsColorPaletteOpen(false);
  };
  return (
    <div className="mb-2 mt-5">
      {" "}
      <>
        <label className="label">
          <span className=" text-[16px] text-secondary text-left font-bold mt-2">
            About Patient
          </span>
        </label>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-5 mb-1 mr-2 gap-x-6 gap-y-1">
          <div>
            <label className="label">
              <span className=" label-font">Race &amp; Ethnicity Details</span>
            </label>
            <select
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              {...register("race_details")}
            >
              <option value=""></option>
              {raceEthnicity.map((p, k) => {
                return (
                  <option value={k} key={k}>
                    {p}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="label">
              <span className=" label-font">Preferred Language</span>
            </label>
            <select
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              {...register("language")}
            >
              {Object.keys(preLanguage).map(function (key) {
                return (
                  <option value={key} key={key}>
                    {preLanguage[key]}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="label">
              <span className=" label-font">Date First Seen</span>
            </label>
            <input
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              type="date"
              {...register("first_date")}
            />
          </div>
          {/* <div>
            <label className="label">
              <span className=" label-font">Physician Type</span>
            </label>
            <select
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              {...register("physician_type")}
            >
              <option></option>
              <option value="dn">DN - Referring</option>
              <option value="dk">DK - Ordering</option>
              <option value="dq">DQ - Supervising</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className=" label-font">Referred By</span>
            </label>
            <select
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              {...register("referred_by")}
            >
              <option value="0"></option>
              <option value="2">Cruz Herman</option>
              <option value="3">Michelle Hardy</option>
              <option value="4">Harriet Burris</option>
              <option value="5">Wyoming Livingston</option>
              <option value="9">Stone Armstrong Hinton</option>
              <option value="10">Knox Hahn Charles</option>
              <option value="23">Rhenys Targarian</option>
              <option value="1">Vanna Berry</option>
            </select>
          </div> */}
          <div>
            <label className="label">
              <span className=" label-font">Assignment</span>
            </label>
            <select
              className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
              {...register("assignment")}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className=" label-font">Background Color</span>
            </label>
            <div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  onClick={toggleColorPalette}
                  type="text"
                  name="background_color"
                  className="input-border-bottom input-font py-[1px] w-full focus:outline-none"
                  {...register("background_color")}
                  style={{ backgroundColor: selectedColor || "#FBCBC7" }}
                />
                {isColorPaletteOpen && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 999,
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "#000",
                      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    <div className="grid grid-cols-5 gap-x-2 gap-y-1">
                      {/* Color Palette Dropdown */}
                      {colorOptions.map((color) => (
                        <div
                          key={color}
                          onClick={() => handleColorSelection(color)}
                          style={{
                            backgroundColor: color,
                            padding: "8px",
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                        ></div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AboutPatient;
