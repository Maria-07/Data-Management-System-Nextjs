import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetRaceEthnicityQuery } from "@/Redux/features/patient/patient-info/patientInfoApi";

const AboutPatient = ({ register }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  //console.log('background_color - ',bgcolor);
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
              <option value="0"></option>
              <option value="1">American Indian or Alaska Native</option>
              <option value="2">Asian</option>
              <option value="3">Black or African American</option>
              <option value="4">Hispanic or Latinx</option>
              <option value="5">Middle Eastern or North African</option>
              <option value="6">
                Native Hawaiian or Other Pacific Islander
              </option>
              <option value="7">White</option>
              <option value="8">Race or ethnicity not listed</option>
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
              <option value=""></option>
              <option value="afr">Afrikaans</option>
              <option value="sqi">Albanian</option>
              <option value="ase">American Sign Language</option>
              <option value="ara">Arabic</option>
              <option value="hye">Armenian</option>
              <option value="eus">Basque</option>
              <option value="ben">Bengali</option>
              <option value="bul">Bulgarian</option>
              <option value="cat">Catalan</option>
              <option value="khm">Central Khmer</option>
              <option value="zho">Chinese</option>
              <option value="hrv">Croatian</option>
              <option value="ces">Czech</option>
              <option value="dan">Danish</option>
              <option value="nld">Dutch</option>
              <option value="eng">English</option>
              <option value="est">Estonian</option>
              <option value="fij">Fijian</option>
              <option value="fin">Finnish</option>
              <option value="fra">French</option>
              <option value="kat">Georgian</option>
              <option value="deu">German</option>
              <option value="guj">Gujarati</option>
              <option value="heb">Hebrew</option>
              <option value="hin">Hindi</option>
              <option value="hun">Hungarian</option>
              <option value="isl">Icelandic</option>
              <option value="ind">Indonesian</option>
              <option value="gle">Irish</option>
              <option value="ita">Italian</option>
              <option value="jpn">Japanese</option>
              <option value="kor">Korean</option>
              <option value="lat">Latin</option>
              <option value="lav">Latvian</option>
              <option value="lit">Lithuanian</option>
              <option value="mkd">Macedonian</option>
              <option value="msa">Malay</option>
              <option value="mal">Malayalam</option>
              <option value="mlt">Maltese</option>
              <option value="mri">Maori</option>
              <option value="mar">Marathi</option>
              <option value="ell">Modern Greek (1453-)</option>
              <option value="mon">Mongolian</option>
              <option value="nep">Nepali</option>
              <option value="nor">Norwegian</option>
              <option value="pan">Panjabi</option>
              <option value="fas">Persian</option>
              <option value="pol">Polish</option>
              <option value="por">Portuguese</option>
              <option value="que">Quechua</option>
              <option value="ron">Romanian</option>
              <option value="rus">Russian</option>
              <option value="smo">Samoan</option>
              <option value="srp">Serbian</option>
              <option value="slk">Slovak</option>
              <option value="slv">Slovenian</option>
              <option value="spa">Spanish</option>
              <option value="swa">Swahili</option>
              <option value="swe">Swedish</option>
              <option value="tam">Tamil</option>
              <option value="tat">Tatar</option>
              <option value="tel">Telugu</option>
              <option value="tha">Thai</option>
              <option value="bod">Tibetan</option>
              <option value="ton">Tonga (Tonga Islands)</option>
              <option value="tur">Turkish</option>
              <option value="ukr">Ukrainian</option>
              <option value="urd">Urdu</option>
              <option value="uzb">Uzbek</option>
              <option value="vie">Vietnamese</option>
              <option value="cym">Welsh</option>
              <option value="xho">Xhosa</option>
              <option value="yid">Yiddish</option>
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
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
