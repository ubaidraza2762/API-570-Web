import { Question } from "../types";

export const API_570_MULTI_AUG_2025: Question[] = [
  {
    id: "aug25-multi-1",
    text: "EXTENDED MATCHING: RESPONSIBILITIES",
    type: "matching",
    matchingPairs: [
      { left: "Engineer", right: "Design and Analysis" },
      { left: "Engineer", right: "Engineering Review" },
      { left: "Repair Organization", right: "Materials and Equipment" },
      { left: "Repair Organization", right: "Quality Control" },
      { left: "Inspector", right: "Repairs and Pressure testing" }
    ]
  },
  {
    id: "aug25-multi-2",
    text: "EXTENDED MATCHING: CUI TEMPERATURE RANGE",
    type: "matching",
    matchingPairs: [
      { left: "Carbon and Low alloy steel", right: "10°F to 350°F" },
      { left: "Austenitic stainless steel", right: "140°F to 350°F" },
      { left: "Duplex SS temperature", right: "280°F to 350°F" }
    ]
  },
  {
    id: "aug25-multi-3",
    text: "EXTENDED MATCHING: AUTHORIZATION and APPROVAL",
    type: "matching",
    matchingPairs: [
      { left: "Repair Authorization", right: "Inspector" },
      { left: "Alteration Authorization", right: "Inspector and engineer" },
      { left: "Welding Procedure Approval for repairs", right: "Inspector or Engineer." },
      { left: "temporary repairs extension approval", right: "Engineer" }
    ]
  },
  {
    id: "aug25-multi-4",
    text: "EXTENDED MATCHING: DEFINITIONS",
    type: "matching",
    matchingPairs: [
      { left: "Thickness that provides early warning", right: "Minimum alert thickness" },
      { left: "Thickness based on appropriate design Code calculations", right: "Minimum required thickness" },
      { left: "Minimum allowed pipe wall thickness Needed to hold the design pressure at the design temperature", right: "Pressure design thickness" },
      { left: "Thickness based on mechanical loads other than pressure", right: "structure minimum thickness" }
    ]
  },
  {
    id: "aug25-multi-5",
    text: "EXTENDED MATCHING: Brinell hardness limit for steels in refining services.",
    type: "matching",
    matchingPairs: [
      { left: "Carbon steel.", right: "200" },
      { left: "1 1/4 Cr-1/2 Mo.", right: "225" },
      { left: "12Cr.", right: "241" }
    ]
  },
  {
    id: "aug25-multi-6",
    text: "Choose the best NDT method for the below damage mechanisms.",
    type: "matching",
    matchingPairs: [
      { left: "Chloride SCC", right: "PT" },
      { left: "Chloride SCC", right: "ET" },
      { left: "Amine SCC", right: "WFMT" },
      { left: "Amine SCC", right: "ACFM" }
    ]
  },
  {
    id: "aug25-multi-7",
    text: "Repairs - Matching Types",
    type: "matching",
    matchingPairs: [
      { left: "Temporary Repair", right: "Full encirclement box" },
      { left: "Temporary Repair", right: "Fillet welded patch" },
      { left: "Permanent Repair", right: "Flush patch" },
      { left: "Permanent Repair", right: "Weld Overlay" }
    ]
  },
  {
    id: "aug25-multi-8",
    text: "When API qualified ultrasonic testing examiner qualification required (CBQ) (Select all that apply)",
    type: "multiple",
    options: [
      "Detection of Through wall defects",
      "Detection of internal flaws",
      "Ultrasonic Corrosion scanning",
      "Ultrasonic thickness measurement"
    ],
    correctAnswer: [0, 1]
  },
  {
    id: "aug25-multi-9",
    text: "The material used in making repair or alteration to carbon steel piping system shall (Select all that apply):",
    type: "multiple",
    options: [
      "Be compatible with original material",
      "conform to applicable code",
      "be known weldable quality",
      "have carbon equivalent more than 0.35",
      "be approved by repair organization's QC inspector"
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: "aug25-multi-10",
    text: "In accordance with PCC-2 when NDE is substituted for pressure testing for repairs and alterations which of the following methods are considered as surface NDE methods (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "Penetrant testing",
      "Magnetic flux leakage",
      "Eddy current testing",
      "Phased array ultrasonics"
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: "aug25-multi-11",
    text: "The Minimum contents of an inspection plan are (Select all that apply):",
    type: "multiple",
    options: [
      "Define the responsibility of repair organization",
      "Define the type of inspection needed",
      "Describe the location of NDE",
      "Describe the RBI requirements"
    ],
    correctAnswer: [1, 2, 3]
  },
  {
    id: "aug25-multi-12",
    text: "An authorized inspection agency is (Select all that apply):",
    type: "multiple",
    options: [
      "a. the inspection organization of the jurisdiction in which the piping system is used",
      "b. the inspection organization of an insurance company that is not licensed or registered to write insurance for piping systems",
      "c. an owner or user of piping systems who maintains an inspection organization for activities relating only to his equipment and for piping systems intended for sale or resale",
      "d. an independent inspection organization employed by or under contract to the owner/user of piping systems that are used only by the owner/user and not for sale or resale"
    ],
    correctAnswer: [0, 2, 3]
  },
  {
    id: "aug25-multi-13",
    text: "Applicable NDT methods for LAP joints (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "PT",
      "MT",
      "RT",
      "UT"
    ],
    correctAnswer: [0, 1]
  },
  {
    id: "aug25-multi-14",
    text: "According to PCC-2 NDE in lieu of pressure testing to repair and alteration is advisable when (Select all that applies):",
    type: "multiple",
    options: [
      "a. NDE provides better assurance of integrity in future operations where crack initiate and propagate are concern",
      "b. A pressure test is practical but NDE can be shown to provide equipment integrity assurance",
      "c. An in-service pressure test may result in yielding of the piping",
      "d. A pressure test is not practical and NDE can be shown to provide equipment integrity assurance"
    ],
    correctAnswer: [0, 2, 3]
  },
  {
    id: "aug25-multi-15",
    text: "When planning for an inspection, which NDE techniques may be used on ferromagnetic material to detect elongated discontinuities that extend to the surface of the material (Select all that apply) (CBQ):",
    type: "multiple",
    options: [
      "a. Advanced Ultrasonic backscatter",
      "b. Acoustic emissions",
      "c. Magnetic particle testing",
      "d. Dye penetrant"
    ],
    correctAnswer: [2, 3]
  },
  {
    id: "aug25-multi-16",
    text: "According to ASME PCC-2, when weld buildup is needed to repair damage to a flange, which of the following statements is true, concerning the requirement of post-weld heat treatment (PWHT)? (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "a. is required if E7018-H4 electrodes are used",
      "b. If required, it must be done before machining",
      "c. Is required when dimensional stability is an issue",
      "d. Is dependent upon the thickness of the weld buildup."
    ],
    correctAnswer: [1, 2, 3]
  },
  {
    id: "aug25-multi-17",
    text: "According to ASME PCC-2 what should be considered when deciding whether welds may be painted prior to hydro pressure testing? (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "a. Whether the paint used could mask a potential leak",
      "b. The cost of performing repairs in the field if a leak occurs",
      "c. Whether dry film thickness (DFT) is higher than 70 mils (1,780 μm)",
      "d. Whether it is possible that the process fluids can act as a solvent on the paint system."
    ],
    correctAnswer: [0, 1, 3]
  },
  {
    id: "aug25-multi-18",
    text: "According to PCC-2 when welding a cavity caused by flaw excavation (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "a. welding according to a qualified welding procedure specification (WPS), using a qualified welder.",
      "b. Perform preheat or post-weld heat treatment, when required by the applicable construction code or post-construction code.",
      "c. 100% RT or UT after welding completion."
    ],
    correctAnswer: [0, 1]
  },
  {
    id: "aug25-multi-19",
    text: "Identify activities typically included the inspection of the pressure relief valves (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "Shop as-received pop test.",
      "Shop inspection/overhaul",
      "Internal inspection of valve inlet and outlet piping.",
      "Visual on-stream inspection.",
      "valve body thickness measurements.",
      "Spring compression test."
    ],
    correctAnswer: [0, 1, 2, 3]
  },
  {
    id: "aug25-multi-20",
    text: "According to ASME PCC-2 under which of the following scenario can in service leak testing be considered? (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "When is not required to verify structural integrity",
      "When a leak is acceptable during start up",
      "When permitted by the application construction code or post construction code",
      "When contractor request it is due to availability of testing equipment",
      "When integrity needs to be verified using in service process medium."
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: "aug25-multi-21",
    text: "Which of the following essential variables addressed by WPS of GTAW from the given list (Select all that apply) OBQ:",
    type: "multiple",
    options: [
      "Base metal thickness.",
      "Preheat.",
      "F-number.",
      "Flow rate.",
      "Position."
    ],
    correctAnswer: [0, 1, 2]
  },
  {
    id: "aug25-multi-22",
    text: "As per ASME PCC-2 in-service hot tapping requires special considerations for (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "planning with competent personnel and appropriate procedures.",
      "pressure and temperature while in service.",
      "environment and company procedures.",
      "the use of improper equipment."
    ],
    correctAnswer: [0, 1]
  },
  {
    id: "aug25-multi-23",
    text: "As per ASME PCC-2 which conditions and applications in-service hot tapping not recommended (Select all that apply) (OBQ):",
    type: "multiple",
    options: [
      "vapor/air or vapor/oxygen mixtures within their flammable explosive range",
      "stainless steel piping containing potassium carbonate solutions",
      "pressure equipment that meets the impact test requirements of the applicable construction code at the operating temperature",
      "Monel piping handling potassium carbonate solutions"
    ],
    correctAnswer: [0, 1]
  }
];
