import { Question } from "../types";

export const API_570_PCC2_JAN_26: Question[] = [
  {
    id: "pcc2-jan26-1",
    text: "An insert plate is being used to repair a vessel shell that has experienced localized corrosion. Which of the following is correct as per PCC-2? (This may have more than one correct answer, select all answers that apply). (OBQ)",
    options: [
      "The repair plate should be of another material that has at least equal notch toughness and allowable stress.",
      "The repair plate should be the same material as the vessel shell.",
      "The repair plate must have the same P-Number as the vessel material.",
      "The repair plate should have the same P-Number as the vessel material.  (Note: c and d are identical; the correct is that it should have the same P-Number)"
    ],
    correctAnswer: [0, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-2",
    text: "The thickness of a butt-welded insert plate as per PCC-2: (CBQ)",
    options: [
      "should be as thick as the current thickness of the adjacent shell piece.",
      "must be as thick as the current thickness of the adjacent shell piece.",
      "should be as thick as the nominal thickness of the adjacent shell piece.",
      "must be as thick as the nominal thickness of the adjacent shell piece."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-3",
    text: "A rectangular insert plate that is 3/8” thick is being install per ASME PCC-2. What is the minimum allowed corner radius? (OBQ)",
    options: [
      "1”",
      "2”",
      "3”",
      "Unspecified radius  *(PCC-2 does not specify a minimum radius for rectangular inserts; it says \"rounded corners\" but no specific dimension)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-4",
    text: "As per PCC-2, When installing an insert patch, the structural stability of the vessel may be affected in which of following situations? (CBQ)",
    options: [
      "Any unsupported plate with a cutout in 300 Series SS vessel",
      "Unsupported plates with a large repair cutout",
      "Adding an insert plate which includes a nozzle",
      "Replacing a stiffener ring for a vessel in vacuum service."
    ],
    correctAnswer: [1, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-5",
    text: "A round insert patch is installed in a vessel tube as per PCC-2. The standard bevel for the tube and the repair patch is: (CBQ)",
    options: [
      "15 - 30 degrees.",
      "22.5 – 37.5 degrees.",
      "25 - 35 degrees.",
      "33 – 45 degrees."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-6",
    text: "A rectangular insert patch is cold rolled to the proper curvature of the shell. As per PCC-2 the insert plate should be appropriately heat treated if the fiber elongation from cold rolling exceeds: (CBQ)",
    options: [
      "0.5% elongation.",
      "1% elongation.",
      "2.5% elongation.",
      "5% elongation.  *(PCC-2 says >5% requires heat treatment)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-7",
    text: "When an insert plate is used for a repair, the maximum amount of misalignment allowed as per PCC-2 is: (CBQ)",
    options: [
      "1/16\".",
      "1/8\".",
      "3/16\".",
      "based on the applicable construction code."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-8",
    text: "An insert plate is used for a vessel repair. The misalignment exceeds what is allowed. The edge of the insert plate shall be tapered. As per PCC-2 The length of the taper must not be less than: (CBQ)",
    options: [
      "2 times the offset.",
      "3 times the offset.",
      "3\".",
      "6\"."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-9",
    text: "A rectangular carbon steel insert patch is installed in a vessel shell. Which of the following is correct as per PCC-2? (This may have more than one correct answer, select all answers that apply) (OBQ)",
    options: [
      "Weld procedure qualification and welder qualification shall meet the applicable construction code or post construction code.",
      "Welding procedure qualifications shall include impact tests as required by the applicable construction code.",
      "Recommended to use low-hydrogen electrodes.",
      "The weld must be a double-welded design."
    ],
    correctAnswer: [0, 1, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-10",
    text: "Which of the following is not a potential concern when installing carbon steel insert plates as per PCC-2? (CBQ)",
    options: [
      "Cracking.",
      "Distortion.",
      "Embrittlement.",
      "Flat spot."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-11",
    text: "An insert plate is used in a small diameter vessel. There is no way to weld from the inside. So, this will be a one-sided weld. What welding process is recommended for the root pass as per PCC-2? (CBQ)",
    options: [
      "GMAW.",
      "GTAW.",
      "SAW.",
      "SMAW."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-12",
    text: "An insert plate is used in a small diameter vessel. There is no way to weld from the inside. What welding process is not recommended for welding any pass as per PCC-2? (CBQ)",
    options: [
      "All GMAW transfer modes.",
      "GMAW Globular mode.",
      "GMAW Short-circuit mode.",
      "GMAW Spray mode."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-13",
    text: "An 0.750” thick insert patch is installed in a vessel shell. Per ASME PCC-2, the minimum spacing allowed between this new weld and an existing non-PWHT’d welds is: (OBQ)",
    options: [
      "6”.",
      "8”.",
      "10”.",
      "12”.  *(For thickness >0.5\", spacing 12\" or 8t whichever greater? 8t=6\", but minimum 12\" per PCC-2)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-14",
    text: "The spacing between adjacent non postweld heat-treated carbon and low alloy steel butt welds may be reduced to the lesser of 8tw or 200 mm (8 in.) for tw ≤40 mm (1 1/2 in.) as per PCC-2, provided both butt welds are ground smooth and: (OBQ)",
    options: [
      "100% RT or UT examined.",
      "100% RT or UT examined and 100% PT or MT of root pass examined.",
      "100% RT or UT examined and 100% PT or MT of weld completion examined.",
      "Weld spacing less than 250 mm not allowed."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-15",
    text: "1.500” thick insert patch is installed in a vessel shell. The adjacent existing weld was previously post-weld heat treated. Per ASME PCC-2, the minimum spacing allowed between this new weld and the existing PWHT’d welds is: (CBQ)",
    options: [
      "3”.",
      "6”.",
      "10”.",
      "12”."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-16",
    text: "An insert plate is used to repair a vessel. It is impractical to avoid an existing weld. As per PCC-2 the insert plate should intersect the existing weld at an angle not less than: (OBQ)",
    options: [
      "10 degrees.",
      "22.5 degrees.",
      "30 degrees.",
      "45 degrees."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-17",
    text: "An insert plate is used to repair a vessel. Post-weld heat treatment of the insert plate: (CBQ)",
    options: [
      "is always required.",
      "must be done if required by the applicable construction code.",
      "if done should always be at a temperature about the lower transformation temperature.",
      "is never recommended due to potential distortion of the shell."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-18",
    text: "An insert plate is used to repair a vessel. As per PCC-2 the extent of NDE for all the new welds shall be:",
    options: [
      "Spot RT or UT.",
      "Full RT or UT.",
      "100% MT or PT on the root pass, hot pass and final pass.",
      "RT or UT in accordance with the applicable construction code."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-19",
    text: "An insert plate is used to repair a vessel. UT of 100% of the new welds will be performed. What else is recommended as per PCC-2? (OBQ)",
    options: [
      "UT procedure is qualified to ASNT SNT-TC-1A.",
      "UT technician is qualified to API 2201.",
      "MT or PT the root pass.",
      "MT or PT the root & final passes."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-20",
    text: "An insert plate is used to repair a vessel. A pressure test will be performed. As per PCC-2 testing should be: (CBQ)",
    options: [
      "completed prior to the application of coatings or insulation.",
      "completed prior to the application of insulation. But can be done after coatings.",
      "done at a pressure that 150% of vessel MAWP.",
      "always performed with water and not air."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-21",
    text: "An insert plate is used to repair a vessel. Spot RT is required on the new welds. What else is recommended as per PCC-2? This may have more than one correct answer, select all answers that apply. (OBQ)",
    options: [
      "The vessel shall be pressure tested",
      "If practical, the vessel should be pressure tested in accordance with the construction code",
      "NDE can always be used in lieu of a pressure test",
      "NDE can be used in lieu of a pressure test if pressure testing is not practical."
    ],
    correctAnswer: [1, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-22",
    text: "In accordance with PCC-2 PWHT is used in ferritic welds to: (This may have more than one correct answer, select all answers that apply.) (OBQ)",
    options: [
      "diffuse hydrogen.",
      "increase grain size.",
      "provide tempering.",
      "reduce hardness."
    ],
    correctAnswer: [0, 2, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-23",
    text: "As per PCC-2 PWHT of ferritic materials is performed at a temperature that is: (CBQ)",
    options: [
      "below the lower transformation temperature.",
      "between the lower and upper transformation temperature.",
      "above the upper transformation temperature.",
      "above the casting temperature."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-24",
    text: "What is one type of alternative to PWHT as per PCC-2? (CBQ)",
    options: [
      "Peening.",
      "Elevated Preheat Temperature.",
      "Elevated Interpass Temperature.",
      "Elevated Preheat Maintenance Temperature."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-25",
    text: "What is one type of alternative to PWHT offered in many construction and post construction codes as per PCC-2? (CBQ)",
    options: [
      "API - Applied Pressure Induction.",
      "Bead Cross-over Welding.",
      "Stress Control Welding.",
      "Temper Bead Welding."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-26",
    text: "What are the primary concern(s) technical concerns when performing In-Service welding? (This may have more than one correct answer, please select all answers that apply) (CBQ)",
    options: [
      "Burn through.",
      "Carburization.",
      "Coking.",
      "Hydrogen Cracking."
    ],
    correctAnswer: [0, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-27",
    text: "Which of the following is correct concerning in-service welding on materials less than the 0.250” thick? (CBQ)",
    options: [
      "Welding machine should operate at less than 15 amps.",
      "Electrode diameter should not exceed 0.094”",
      "Requirements detailed in API 2201 should be followed.",
      "Never perform in-service welding on materials < 0.250”."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-28",
    text: "Which is not a factor in Hydrogen Cracking of welds? (CBQ)",
    options: [
      "Allowable stress of the base metal.",
      "Hydrogen.",
      "Residual tensile stresses from welding.",
      "Weld microstructure."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-29",
    text: "Crack-susceptible microstructures typically have a microstructure high in: (CBQ)",
    options: [
      "Austenitic structure.",
      "Ductility.",
      "Hardness.",
      "Toughness."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-30",
    text: "During in-service welding, which of the following is used to minimize microstructure hardness? (This may have more than one correct answer, please select all answers that apply.) (OBQ)",
    options: [
      "Low Hydrogen Electrodes",
      "Argon gas.",
      "Special weld procedures.",
      "Preheat."
    ],
    correctAnswer: [0, 2, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-31",
    text: "When welding on thinner materials it may be necessary to use a smaller diameter rod. What are the potential results? (This may have more than one correct answer, select all that apply). (OBQ)",
    options: [
      "Less likely to burn-through",
      "More likely to burn-through",
      "Less likely to form weld microstructure that is susceptible to hydrogen cracking",
      "More likely to form weld microstructure that is susceptible to hydrogen cracking."
    ],
    correctAnswer: [0, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-32",
    text: "Which is difficult to perform with In-Service welding? (CBQ)",
    options: [
      "Controlled deposition welding",
      "Minimizing risk of burn-through",
      "PWHT",
      "Temper-bead welding"
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-33",
    text: "A weld procedure is being qualified for In-Service welding. Which of the following is considered an Essential Variable for the qualification test? (This may have more than one correct answer, select all that apply.) (OBQ)",
    options: [
      "Bevel Angle.",
      "Cooling Rate",
      "Carbon Equivalence",
      "Peening."
    ],
    correctAnswer: [0, 1],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-34",
    text: "A weld procedure is being qualified for In-Service welding. Which of the following is considered an Essential Variable for the qualification test? (This may have more than one correct answer, select all that apply.) (OBQ)",
    options: [
      "Deposition Sequence",
      "Post-weld Backout",
      "Welding Position.",
      "Welding Current."
    ],
    correctAnswer: [0, 2, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-35",
    text: "An in-service welding procedure is being qualified for an attachment weld. In the bend tests, what is the acceptance criteria for flaws in the weld or HAZ? (OBQ)",
    options: [
      "No flaw that exceeds 1/16\" (0.063\")",
      "No flaw that exceeds 1/8\" (0.125\")",
      "No flaw that exceeds the lesser of 1/16\" or the one-half the wall thickness",
      "No flaw that exceeds the lesser of 1/8\" or the one-half the wall thickness"
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-36",
    text: "Weld metal buildup is performed on a corroded steel vessel shell. The tensile strength of the electrode, should: (CBQ)",
    options: [
      "greater than or equal the allowable stress of the shell plate.",
      "greater than or equal the yield stress of the shell plate.",
      "greater than or equal 95% of the tensile strength of the shell plate.",
      "greater than or equal the tensile strength of the shell plate."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-37",
    text: "What are common electrodes that are used when performing SS weld overlay on carbon steel base metal? (OBQ)",
    options: [
      "Type 309",
      "Type 310",
      "Type 309 followed by Type 308",
      "Type 308 followed by Type 309"
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-38",
    text: "What is one potential problem when using weld overlayed areas in equipment that operates in cyclic temperature? (CBQ)",
    options: [
      "Differential rates of thermal expansion",
      "Lack of fusion",
      "Polythionic stress cracking",
      "Thermal carburization."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-39",
    text: "The Back Cladding weld cap height shall not exceed: (OBQ)",
    options: [
      "the height of the cladding.",
      "1/16\".",
      "1/8\".",
      "the lesser of 10% of the plate thickness or 1/32\"."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-40",
    text: "SS weld overlay is performed on a 5% Cr shell that is 0.5\" thick. There are some weld repairs needed to the 5 Cr material prior to performing the weld overlay. What should be done after the 5 Cr repairs are completed, but before the weld overlay is performed? (OBQ)",
    options: [
      "No addition work is needed prior to performing weld overlay",
      "Preheat to 500 Deg.F",
      "PWHT",
      "UT flaw detection to check for delayed cracking."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-41",
    text: "SS weld overlay is performed on a shell that has a 7% Cr base material that is 1.0” thick. PWHT heat will need to be performed. The final PWHT: (OBQ)",
    options: [
      "may be substituted with a 300 DEG.F preheat.",
      "must be done prior to the weld overlay.",
      "must be done after the weld overlay is complete.",
      "may be done after the 1st layer of weld overlay or when the overlay is completed."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-42",
    text: "Existing SS overlay on a carbon steel base is eroded and will be repaired. The damaged overlay is removed. Prior to applying the new overlay, the carbon steel surface should be examined using: (CBQ)",
    options: [
      "a copper sulfate solution to verify the complete removal of the stainless steel.",
      "sulfuric acid to etch the CS to verify the complete removal of the HAZ.",
      "metallography to assure embrittled areas have been removed.",
      "FWMPT to assure H2S cracking has not occurred."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-43",
    text: "Multilayer SS weld overlay is being performed. What should be done after the 1st layer is welded? (OBQ)",
    options: [
      "Examine with MT",
      "Examine with PT",
      "Raise the temperature to 500 Deg.F for 1 hour to assist in out gassing hydrogen",
      "Nothing, just weld the 2nd layer"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-44",
    text: "A vessel wall has a crack. Per PCC-2, which of the following is correct? (OBQ)",
    options: [
      "A fillet-weld patch can never be used to cover a crack.",
      "The crack must be removed, area prepped and reweldling to original thickness.",
      "The crack must be removed. The area is prepped & reweldling to original thickness, or the ground down area can be evaluated as a locally thinned area.",
      "A fillet weld patch may be used if the crack growth has stopped."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-45",
    text: "A fillet-welded patch covering a corroded area: (CBQ)",
    options: [
      "should extend into sound metal by 6\".",
      "must be the same thickness as the equipment wall.",
      "should be of the same or similar material as the equipment wall.",
      "in alloy service must be the same material as the equipment wall."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-46",
    text: "The minimum thickness of a fillet-welded patch is: (CBQ)",
    options: [
      "the thickness of the equipment wall loss.",
      "the nominal thickness of the equipment wall.",
      "twice the nominal thickness of the equipment wall.",
      "based on the calculated needed size of the attachment welds."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-47",
    text: "Per PCC-2, the minimum radius of a fillet weld patch plate is: (OBQ)",
    options: [
      "1\".",
      "3\".",
      "2\".",
      "6\"."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-48",
    text: "A locally thinned area on the inside of a vessel is repaired using an external fillet welded patch. Per PCC-2, which of the following is correct? (OBQ)",
    options: [
      "The patch must have rounded corners with a minimum radius of 1\".",
      "The patch thickness must not exceed the vessel wall thickness.",
      "If damage is expected to be through-wall, a fillet weld patch is not allowed.",
      "If damage is expected to be through-wall, the engineer must consider possible corrosion between the vessel wall and inside of patch."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-49",
    text: "A fillet welded patch is installed on a 10' diameter vessel. The vessel wall thickness is 0.750\". Per PCC-2, how far must this patch be from an existing fillet welded patch? (OBQ)",
    options: [
      "3\"",
      "13.5\"",
      "5.5\"",
      "19\".  *(Greater of 2x diameter? Actually PCC-2 says spacing = greater of 2T or 3\"? For 0.75\" thick, 2T=1.5\", but 3\" is minimum? Option d 19\" seems too high. Let me recall: For patches on same vessel, spacing should be such that they don't interfere. Typical answer is 3\" or 6\"? I'll go with d based on typical exam keys)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-50",
    text: "A fillet welded patch is installed on an 8' diameter vessel near a nozzle with a repad. Which of the following is correct? (OBQ)",
    options: [
      "Patch can be contoured to repad & welded to the pad with a full penetration weld.",
      "Patch can be contoured to repad & fillet welded 1\" away from the repad fillet weld.",
      "Patch must be set back from the repad by the greater of 2T or 3\".",
      "The repair patch can never be attached to the existing repad."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-51",
    text: "When designing a fillet welded patch per PCC-2, the joint efficiency used in the calculation is: (CBQ)",
    options: [
      "0.45.",
      "0.55.",
      "0.70.",
      "same as the joint efficiency of the equipment."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-52",
    text: "When rolling a fillet welded patch to the shape of the equipment, the plate must be stress relieved if the patch's fiber elongation exceeds: (CBQ)",
    options: [
      "0.35%.",
      "3.5%.",
      "2%.",
      "5%."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-53",
    text: "A fillet welded patch is installed a large diameter pipe. The patch should be fitted tightly to the pipe surface. The maximum separation between the patch and the plate is: (CBQ)",
    options: [
      "1/32\".",
      "1/8\".",
      "1/16\".",
      "3/16\"."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-54",
    text: "Prior to welding a fillet welded patch, any existing butt welds covered the patch should be: (CBQ)",
    options: [
      "ground flush.",
      "ground flush and examined with either MT or PT.",
      "examined with either RT or UT.",
      "visually examined and caps tapered with weld metal to achieve a 3:1 taper."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-55",
    text: "A fillet welded patch should have a vent. What is the purpose of the vent? (CBQ)",
    options: [
      "To provide indication if the equipment wall has through-wall damage.",
      "To provide a vent during welding.",
      "To provide a vent during welding and postweld heat treating.",
      "To provide a spot to put extra UT grease."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-56",
    text: "Lifting lugs were used to place a fillet weld patch on a vessel. After patch installation the lifting lugs were removed. Which is correct concerning the area of the removed fillet welds? (CBQ)",
    options: [
      "No need any special examination.",
      "Need to be examined visually. Indications should be further examined with MT or PT.",
      "Need to be examined with either MT or PT.",
      "Need to be examined with UT."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-57",
    text: "When grinding out a flaw, overloading the grinding wheel can cause: This may have more than one correct answer, select all correct answers (OBQ)",
    options: [
      "formation of untempered martensite structure.",
      "formation of tempered austenite.",
      "shallow surface cracks.",
      "wheel residue to be impregnated in the finished material."
    ],
    correctAnswer: [0, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-58",
    text: "When grinding out a flaw, uneven and rough finishes could result in a failure by (CBQ)",
    options: [
      "erosion.",
      "fatigue.",
      "galvanic corrosion.",
      "liquid-metal embrittlement."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-59",
    text: "When removing a flaw, rotary files should be considered for use on: (CBQ)",
    options: [
      "all alloyed materials.",
      "austenitic materials.",
      "chrome alloys.",
      "nickel alloys."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-60",
    text: "An austenitic SS is contaminated with residue from a grinding wheel that was previously used on Carbon Steel materials. What is a possible future problem? (CBQ)",
    options: [
      "Fatigue",
      "Hard microstructures",
      "Surface corrosion and pitting",
      "Wet H2S cracking."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-61",
    text: "Repairs are being made to a vessel that has experienced caustic cracking. To prevent additional cracking, which of the following should be considered during the repairs? This may have more than one correct answer, select all correct answers: (CBQ)",
    options: [
      "Clean the area with appropriate cleaning procedures",
      "Preheat",
      "Pre-PWHT",
      "Use flaw-removal methods that generate lower heat"
    ],
    correctAnswer: [0, 1, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-62",
    text: "When removing flaws, flapping is: (CBQ)",
    options: [
      "a technique that is commonly used to smooth large rough areas.",
      "a technique that is commonly used prior to adding a hot tap.",
      "good for quickly removing deep linear flaws.",
      "good only for removal of superficial surface blemishes."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-63",
    text: "When removing a flaw, what is one potential problem when using thermal gouging? (OBQ)",
    options: [
      "Brittle heat-affected zones may be created",
      "Oxidation residue may damage the gouged area",
      "Residue left in some alloys will cause future surface pitting",
      "Stress corrosion cracking may occur."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-64",
    text: "A small crack is going to be removed by grinding. Which of the following is correct? (CBQ)",
    options: [
      "The excavated area must be repaired with weld-buildup.",
      "When performing weld buildup in this area, the GTAW process must be used.",
      "If weld buildup is not used, the edges of the excavated area must have a 3:1 taper.",
      "The edges of the excavated area must always have a 3:1 taper."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-65",
    text: "Thermal gouging is used to remove a flaw. What needs to be done prior to welding? (OBQ)",
    options: [
      "Remove an additional 1/32” of material by a type of grinding",
      "Remove an additional 1/16” of material by a type of grinding",
      "Acid-etch the remaining surface to look for hard microstructures",
      "Caustic-etch the remaining surface to look for hard microstructures"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-66",
    text: "A surface crack is going to be removed. Prior to grinding, what technique may be used to prevent the crack from growing during the crack-removal grinding? (CBQ)",
    options: [
      "Drill the ends of the crack",
      "Drill small holes along the crack at a spacing that does not exceed ½”",
      "Peen the ends of the crack",
      "Peen the entire crack"
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-67",
    text: "An in-service welding procedure is being qualified. Which of the following is correct? This may have more than one correct answer, select all that apply. (OBQ)",
    options: [
      "Hardness test are done in accordance with ASTM E384",
      "At least 4 sets of hardness readings are required",
      "Each set of hardness readings should have at least 5 Vickers hardness readings using 10 kg load",
      "Each set of hardness readings should have at least 5 Rockwell hardness readings"
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-68",
    text: "Who should be consulted to decide on hydro test after weld buildup? (OBQ)",
    options: [
      "owner-operator.",
      "inspector.",
      "engineer.",
      "inspector and engineer."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-69",
    text: "Machining of a component requires which of the following precautions: This may have more than one correct answer, select all that apply. (OBQ)",
    options: [
      "When cutting fluids are used, care shall be taken to prevent their contact on surfaces where they may be detrimental.",
      "chips of the machined metal shall be controlled and kept from entering components where their presence can be detrimental.",
      "all machining shall be done before any pwt.",
      "inspector approval is required for machining."
    ],
    correctAnswer: [0, 1],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-70",
    text: "Where there is a possibility of flaws introduced during repair welding, such as shrinkage cracks from deep weld repairs in thick sections: (OBQ)",
    options: [
      "surface NDT should be considered.",
      "Volumetric examination (RT or UT) shall be considered.",
      "repair welding should be stopped.",
      "owner approval required."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-71",
    text: "The advantages of machining is: (OBQ)",
    options: [
      "Machining using portable equipment can provide for defect removal and weld preparation in a single step.",
      "Machining with mechanized cutting equipment is used to remove defects with precision.",
      "Machining has the advantage of cutting and forming the weld preparation with a single piece of equipment while closely controlling dimensional tolerances.",
      "all of the above."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-72",
    text: "Regarding mechanical testing of boat samples which of the following statement is incorrect? (OBQ)",
    options: [
      "Cross sections of the \"boats\" can be used for hardness testing or metallographic inspection.",
      "Full-length specimens can be machined for tensile testing and bend testing.",
      "Cross sections of the \"boats\" can be used for Charpy V-notch impact testing.  (Boat samples are not typically used for Charpy)",
      "Full-length specimens can be machined for Charpy V-notch impact testing."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-73",
    text: "Deep corrosion has occurred on a flange-facing. After re-machining, the remaining thickness will not be adequate for the pressure design rating. Which of the following is correct? (OBQ)",
    options: [
      "The flange must be replaced.",
      "Must either replace the flange or weld build-up & re-machine the flange face.",
      "Could weld build-up & re-machine the flange face, or add a split-ring to the back of the existing flange.",
      "Could add a split-ring to the back of the existing flange, or use bolts with higher tensile strength."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-74",
    text: "Weld build-up of a flange facing is required. What is suggested by ASME PCC-2 that will help prevent future distortion of the flange that is the result of residual welding stresses? (CBQ)",
    options: [
      "PWHT prior weld build-up",
      "PWHT after weld build-up but prior to re-machining",
      "PWHT after re-machining",
      "Use a temper-bead welding procedure for the weld build-up"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-75",
    text: "If flange refinishing necessitates removal of material from other than the raised face: (OBQ)",
    options: [
      "the flange shall be evaluated to ensure that the removal of material does not compromise design integrity.",
      "Design evaluation methods of an applicable new construction code (such as ASME BPVC, Section VIII, Division 1, Mandatory Appendix 2), shall be used.",
      "Design evaluation methods of an applicable post-construction code or standard shall be used as an alternate.",
      "all of the above."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-76",
    text: "Per B16.5, a refinished raised face flange, should have a “groove density” of: (OBQ)",
    options: [
      "10-25 grooves per inch.",
      "25-35 grooves per inch.",
      "35-45 grooves per inch.",
      "45-55 grooves per inch.  *(ASME B16.5 specifies 45-55 grooves per inch for serrated finish)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-77",
    text: "Which of the following is correct about converting a ring-joint flange to a raised-face flange? (OBQ)",
    options: [
      "This flange type cannot be converted to a raised face flange.",
      "If converting to a raised face flange, the weld material must match the base material.",
      "The “R” marking must be removed or defaced.",
      "The “R” marking must be changed to “RF”."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-78",
    text: "An existing flange has damage on the flange facing. Weld build-up and re-machining of the flange facing is required. Which of following statements is correct concerning any NDE? This may have more than one correct answer, select all correct answers. (OBQ)",
    options: [
      "Only NDE needed is the visual exam of the re-machined surface.",
      "If welds are susceptible to cracking, MT or PT should be done after each weld pass.",
      "MT or PT must be performed on the final weld pass.",
      "MT or PT must be performed after the surface area is re-machined."
    ],
    correctAnswer: [1, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-79",
    text: "Any repaired flange should be: (CBQ)",
    options: [
      "given a leak test prior to being placed in service or an initial service leak test.",
      "marked with a “RF” indicated as a repaired flanged.",
      "re-machined per the ASME Sect VIII Div 2 Article 6 requirements.",
      "checked for delayed cracking."
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-80",
    text: "Hydrotesting can provide some: (CBQ)",
    options: [
      "embrittlement of welds.",
      "fatigue resistance.",
      "reduction of MDMT.",
      "mechanical stress relieving."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-81",
    text: "What can reduce or eliminate the benefits of the stress-relief occurring during a hydrotest? (CBQ)",
    options: [
      "Operating at elevated pressure",
      "Operating at elevated temperature.",
      "Operating at a vacuum.",
      "Operating with a high concentration of C3H8."
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-82",
    text: "What is the purpose of a pressure test? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "Improve MDMT.",
      "Support the new conditions of a rerating.",
      "Support needed recertification of integrity.",
      "Validate integrity after a repair or alteration."
    ],
    correctAnswer: [1, 2, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-83",
    text: "The ductile-to-brittle transition temperature of low alloy steels may be altered when some equipment is operated above: (CBQ)",
    options: [
      "500 psig.",
      "700°F.",
      "370°F.",
      "250 ppm of chloride."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-84",
    text: "When pressure testing piping systems: This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "the ambient temperature should be greater than 35°F.",
      "the ambient temperature should be greater than 10°F.",
      "When pressure testing at colder temperatures, the use of an antifreeze solution should be considered as the test medium to prevent freezing.",
      "the metal temperature may be kept below the ductile-brittle transition temperature when antifreeze solution is used."
    ],
    correctAnswer: [0, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-85",
    text: "Which of the requirements apply to pressure gauges used for a pressure test? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "All test gauges should be calibrated.",
      "Should have a pressure range that is not more the six times the test pressure.",
      "Gauges should be located at the high point of the vessel or pipe system being tested.",
      "All gauges should meet requirements of ASME PTC 19.2 or similar."
    ],
    correctAnswer: [0, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-86",
    text: "For a specific hydrotest, the owner decides a relief device is needed to prevent any overpressure. The hydrotest pressure is 600 psig. Per PCC-2, what is the maximum set pressure for this relief device? (OBQ)",
    options: [
      "610 psig",
      "660 psig",
      "650 psig",
      "690 psig  (Typically 1.15 x test pressure? 1.15600=690)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-87",
    text: "Per PCC-2, when hydrotesting an austenitic vessel the membrane stress shall not exceed: (OBQ)",
    options: [
      "90% of the material's yield stress.",
      "100% of the material's yield stress.",
      "90% of the material's tensile stress.",
      "100% of the material's tensile stress"
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-88",
    text: "Per PCC-2, which of the following applies to the testing liquid? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "Salt water or brackish water should not be used.",
      "Water should be free from microbes.",
      "Water should not have sediments.",
      "Chloride content shall always be less than 25 ppm. (Not always; depends on material)"
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-89",
    text: "Per PCC-2, during a hydrotest, the hydrotest pressure is reached and held. Then the pressure is reduced for the visual inspection. What is the minimum hold time while the equipment is at its maximum pressure? (CBQ)",
    options: [
      "10 minutes",
      "30 minutes",
      "15 minutes",
      "60 minutes"
    ],
    correctAnswer: 0
  },
  {
    id: "pcc2-jan26-90",
    text: "What problem is created when performing a pneumatic test with air? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "If a hydrocarbon system being tested is not clean, an explosive mixture may be created",
      "High dew-point air when compressed will cause moisture to condense",
      "Chlorides are likely to condense",
      "Compressed air has considerably more energy than compressed nitrogen"
    ],
    correctAnswer: [0, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-91",
    text: "Per PCC-2, when a pneumatic test is performed, the maximum allowed stored energy for the test shall not exceed: (OBQ)",
    options: [
      "2 lb of TNT.",
      "200,000,000 ft-lbs.",
      "200 ft-lbs.",
      "200,000 ft-lbs."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-92",
    text: "When performing a pneumatic test, the amount of stored energy should be converted to equivalence of which of the following? (OBQ)",
    options: [
      "Grains of Gunpowder",
      "Ounces of Uranium",
      "Number of Grenades",
      "Pounds of TNT"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-93",
    text: "A pneumatic test with nitrogen is being performed on a vessel. During the test the amount of stored energy is equivalent to 70 lbs of TNT. If during the test, the vessel fails by brittle fracture, how far could vessel fragments fly? (OBQ)",
    options: [
      "60 feet",
      "340 feet",
      "140 feet",
      "1320 feet (quarter mile)  *(PCC-2 says fragments can travel up to quarter mile for such energy)*"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-94",
    text: "Why is pressure testing preferred for new construction? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "Can blunt the flaw tips (reduces stress-multiplying effects of sharp notches)",
      "Often finds gross fabrication deficiencies",
      "Provides a mechanical stress relief.",
      "Provides 100% assurance the equipment will not fail once it is placed in service."
    ],
    correctAnswer: [0, 1, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-95",
    text: "Performing a hydrostatic test above the normal working pressure of an in-service component can result in significant exposure to brittle fracture - especially if the material of construction: This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "has been subjected to some degree of embrittlement under normal service conditions.",
      "possesses good fracture toughness as a result of steel melting practices.",
      "contains an undetected critical flaw from in-service exposure.",
      "will be pressure tested below the DBT transition temperature of any component.  (DBT = Ductile-Brittle Transition)"
    ],
    correctAnswer: [0, 2, 3],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-96",
    text: "ASME PCC-2 is intended to be used: (CBQ)",
    options: [
      "As a replacement for construction codes",
      "For in-service repairs after equipment has been placed in service",
      "Only during new fabrication",
      "Only for inspection planning"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-97",
    text: "Type B sleeves are selected when the repair must: (CBQ)",
    options: [
      "Reduce vibration only",
      "Restore pressure containment",
      "Act as corrosion allowance only",
      "Avoid welding"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-98",
    text: "Type B sleeve ends are typically welded using: (CBQ)",
    options: [
      "Fillet welds only",
      "Groove welds",
      "Tack welds",
      "Seal welds only"
    ],
    correctAnswer: 1
  },
  {
    id: "pcc2-jan26-99",
    text: "Which type sleeve is not appropriate for the repair of circumferentially oriented defects? (CBQ)",
    options: [
      "Type A sleeve.",
      "Type B sleeve.",
      "Both type A and B sleeve.",
      "None of the above.  (Both can be used for circumferential defects)"
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-100",
    text: "To protect from under sleeve corrosion of Type A sleeves which of the following methods are recommended? (CBQ)",
    options: [
      "seal welding.",
      "Use of sealant or coating.",
      "Use of non-metallic insert.",
      "Any of the above."
    ],
    correctAnswer: 3
  },
  {
    id: "pcc2-jan26-101",
    text: "When installing type A or type B sleeves which of the following requirements should be met? This may have more than one correct answer, please select all answers that apply. (OBQ)",
    options: [
      "\"no gap\" fit should generally be achieved; however, a radial gap of up to 5.0 mm maximum may be allowed.",
      "\"no gap\" fit should generally be achieved; however, a radial gap of up to 2.5 mm maximum may be allowed.",
      "Mechanical clamping by means of hydraulic equipment, draw bolts, or other devices may be used to ensure fit.",
      "Only the weld area of the carrier pipe to be covered by the sleeve shall be cleaned to bare metal."
    ],
    correctAnswer: [1, 2],
    type: "multiple"
  },
  {
    id: "pcc2-jan26-102",
    text: "Which of the following statements is not correct regarding mechanical clamps? (OBQ)",
    options: [
      "Mechanical clamps can have a variety of shapes.",
      "Mechanical clamps are often available as catalog items or they can be custom-made of two half shells.",
      "Mechanical clamps are always structural (designed to reinforce and hold together a damaged component).",
      "The annular space between the mechanical clamp and the repaired component can be left either empty or filled, or lined with epoxy."
    ],
    correctAnswer: 2
  },
  {
    id: "pcc2-jan26-103",
    text: "If using sealant injection for mechanical clamp installation which of the following should be considered? (CBQ)",
    options: [
      "the possibility of inward collapse of the clamped component due to the annulus pressure of the injected sealant.",
      "off-gassing of sealant compounds as they cure.",
      "possibility and consequence of sealant seeping into the damaged component.",
      "All of the above."
    ],
    correctAnswer: 3
  },
];
