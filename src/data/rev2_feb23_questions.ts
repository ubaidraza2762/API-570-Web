import { Question } from "../types";

export const API_570_REV2_FEB_2023: Question[] = [
  {
    id: "rev2-1",
    text: "(1) Which of the following area have higher susceptibility to localized damage due to sour water corrosion of carbon steel?",
    options: [
      "a. Piping dead legs",
      "b. High velocity or turbulence",
      "c. Low velocity at ambient temperature",
      "d. Piping operating between 100°F and 140°F."
    ],
    correctAnswer: 1,
    hint: "Sour water corrosion often involves velocity-accelerated damage (erosion-corrosion)."
  },
  {
    id: "rev2-2",
    text: "(2) A carbon steel piping system for hydrocarbon service is insulated and steam traced. Typical operating temperature is 225°F (107°C). Several systems nearby are in the same service and have exhibited no corrosion problems. Water is found dripping at one of the insulation jacketing seams. The inspector should:",
    options: [
      "a. Consider the possibility of corrosion under insulation due to leaking steam tracing.",
      "b. Have operations shut off the steam tracing system until the source of the leak can be determined.",
      "c. Write a work ticket to switch to electric heat tracing.",
      "d. Check piping for stress corrosion cracking if insulation contains chlorides."
    ],
    correctAnswer: 0,
    hint: "Steam tracing leaks provide a constant source of moisture for CUI, especially in the 10°F to 350°F range."
  },
  {
    id: "rev2-3",
    text: "(3) Amine stress corrosion cracking is most often found:",
    options: [
      "a. In Alloy 400 piping systems.",
      "b. In applications of clad stainless steel.",
      "c. At or adjacent to non-PWHT carbon steel weldments.",
      "d. In pure alkane amine systems subject to highly hot worked parts."
    ],
    correctAnswer: 2,
    hint: "PWHT is the primary defense against amine SCC in carbon steel."
  },
  {
    id: "rev2-4",
    text: "(4) Foreign solid material entrapped in a weld (slag, flux, oxides, etc.) is defined as a/an:",
    options: [
      "a. Imperfection",
      "b. Flow",
      "c. Inclusion",
      "d. Defect."
    ],
    correctAnswer: 2,
    hint: "Non-metallic materials trapped in weld metal are classified as inclusions."
  },
  {
    id: "rev2-5",
    text: "(5) Which of the following equipment parts would be most susceptible to erosion?",
    options: [
      "a. Overhead piping on fractionators",
      "b. Reducer located in a pump discharge system",
      "c. Dissimilar metal welds",
      "d. Overlayed materials exhibiting differing thermal expansion properties."
    ],
    correctAnswer: 1,
    hint: "Areas of high velocity (pump discharge) and turbulence (reducers) are prime erosion sites."
  },
  {
    id: "rev2-6",
    text: "(6) All repair and alteration welding shall be done in accordance with the principles of ASME B31.3 or:",
    options: [
      "a. OSHA 1910.119.",
      "b. API 570 and API RP 574.",
      "c. National Board Boiler Code.",
      "d. The code to which the piping system was built."
    ],
    correctAnswer: 3,
    hint: "Repairs should generally follow the original construction code or B31.3."
  },
  {
    id: "rev2-7",
    text: "(7) Piping systems with little or no flow may be classified for inspection purposes as:",
    options: [
      "a. Dead legs.",
      "b. Spare systems.",
      "c. Vents and drains.",
      "d. Normally blocked-in."
    ],
    correctAnswer: 0,
    hint: "Stagnant areas are defined as dead legs and are high-risk for corrosion."
  },
  {
    id: "rev2-8",
    text: "(8) A run of piping has a longitudinal crack. Under which conditions may this flaw be temporarily repaired by the use of a full encirclement welded split sleeve or box-type enclosure?",
    options: [
      "a. Fillet welds on enclosures shall be examined by an appropriate NDE technique.",
      "b. Longitudinal cracks should have the crack ends drilled prior to applying the full encirclement sleeve or box.",
      "c. A piping engineer has determined that the crack would not be expected to propagate from under the sleeve.",
      "d. The full encirclement welded split sleeve or box must be designed by a leak clamp manufacturer."
    ],
    correctAnswer: 2,
    hint: "Crack propagation analysis by an engineer is required for this type of temporary repair."
  },
  {
    id: "rev2-9",
    text: "(9) For flush patches on a Class 1 or Class 2 piping system, the weld shall be 100% radiographed:",
    options: [
      "a. or ultrasonically examined.",
      "b. And ultrasonically examined.",
      "c. or magnetic particle examined",
      "d. And magnetic particle examined."
    ],
    correctAnswer: 0,
    hint: "RT or UT is required for 100% volumetric examination of flush patch welds."
  },
  {
    id: "rev2-10",
    text: "(10) Insert patches (flush patches) may be used to repair damaged or corroded areas if certain requirements are met, including:",
    options: [
      "a. The cap pass on all fillet welds shall be PT or MT examined.",
      "b. The cap pass of the patch is ground flush with the outside diameter of the pipe",
      "c. 100% phased array UT examination is conducted in accordance with ASME Section V.",
      "d. Patches may be any shape but shall have rounded corners [1 in. (25 mm) minimum radius]."
    ],
    correctAnswer: 3,
    hint: "Rounded corners (1 inch min) are required to reduce stress concentration."
  },
  {
    id: "rev2-11",
    text: "(11) A piping system made of mixed grades of piping, including carbon steel with non-silicon killed elbows and fittings, has recently been rerated from 400°F (204°C) to 550°F. The process fluid contains 0.52% weight sulfur. The unit inspector should:",
    options: [
      "a. Increase the number of condition monitoring locations (CMLs) on the system.",
      "b. Continue monitoring the system utilizing existing condition monitoring locations (CMLs) if they have never shown more than 0.002 in. (0.05 mm) per year corrosion rates",
      "c. Relocate the condition monitoring locations (CMLs) to the fittings.",
      "d. Not be concerned with the 150°F change."
    ],
    correctAnswer: 0,
    hint: "Sulfidation rates significantly increase above 450-500°F, especially in low-silicon carbon steel."
  },
  {
    id: "rev2-12",
    text: "(12) When impact testing of pipe is required by ASME B31.3, the impact test shall be conducted per ASTM A370 and:",
    options: [
      "a. A-320.",
      "b. A-333.",
      "c. A-334.",
      "d. A-420."
    ],
    correctAnswer: 1,
    hint: "ASTM A333 is the standard for low-temperature service piping."
  },
  {
    id: "rev2-13",
    text: "(13) Statistical analysis of thickness data is not applicable to piping systems with significant:",
    options: [
      "a. Unpredictable general corrosion mechanisms.",
      "b. Localized predictable corrosion mechanisms.",
      "c. Localized unpredictable corrosion mechanisms.",
      "d. Predictable general corrosion mechanisms."
    ],
    correctAnswer: 2,
    hint: "Statistics are valid for general/uniform damage, but not for random localized damage."
  },
  {
    id: "rev2-14",
    text: "(14) Which of the following describes triboelectric testing devices for materials verification?",
    options: [
      "a. Qualitative and quantitative but not capable of detecting carbon",
      "b. Qualitative and accurately determines all elements including carbon",
      "c. Qualitative and appropriate for sorting applications",
      "d. Qualitative and May only be appropriate for sorting applications"
    ],
    correctAnswer: 3,
    hint: "Triboelectric (and thermoelectric) tests are basic sorting tools, not precise analytical devices."
  },
  {
    id: "rev2-15",
    text: "(15) An insulated Class 1 austenitic stainless-steel pipe is inspected for CUI. The piping system operates at 300°F (150°C). What percentage of follow-up examination is recommended at areas with damaged insulation?",
    options: [
      "a. 0%",
      "b. 25%",
      "c. 50%",
      "d. 75%"
    ],
    correctAnswer: 3,
    hint: "Class 1 systems require high inspection density (up to 75% for stainless in the CUI range)."
  },
  {
    id: "rev2-16",
    text: "(16) Mix point thermal fatigue may be a concern if the temperature difference between the two process streams (main pipe liquid to secondary pipe gas) in a piping system made from ferritic materials exceed:",
    options: [
      "a. 125°F",
      "b. 275°F",
      "c. 300°F",
      "d. 450°F"
    ],
    correctAnswer: 3,
    hint: "A delta-T of 450°F is a common threshold for thermal fatigue concern in mixing circuits for ferritic materials."
  },
  {
    id: "rev2-17",
    text: "(17) The actual thickness of wrought piping may vary from its nominal thickness by a manufacturing under tolerance of as much as:",
    options: [
      "a. 12.5%",
      "b. 12.0%",
      "c. 10.0%",
      "d. 10.5%"
    ],
    correctAnswer: 0,
    hint: "ASTM standards allow a 12.5% variation from nominal thickness."
  },
  {
    id: "rev2-18",
    text: "(18) Which of the following valves would make pigging impossible?",
    options: [
      "a. Gate",
      "b. Globe",
      "c. Slide",
      "d. Ball"
    ],
    correctAnswer: 1,
    hint: "The internal bridge/partition in a globe valve blocks the pig's path."
  },
  {
    id: "rev2-19",
    text: "(19) Temporary piping repair may remain for an indefinite period of time if they are Approved and documented by the:",
    options: [
      "a. Authorized piping inspector.",
      "b. Manager of maintenance.",
      "c. Operating manager.",
      "d. Piping engineer."
    ],
    correctAnswer: 3,
    hint: "Engineering approval is required for temporary repairs to stay in place long-term."
  },
  {
    id: "rev2-20",
    text: "(20) Which of the following is not a required marking on a B-16.5 flanged fitting?",
    options: [
      "a. Pressure class rating.",
      "b. Temperature range.",
      "c. Material specification.",
      "d. Manufacturer name or marking."
    ],
    correctAnswer: 1,
    hint: "Temperature range is not a mandatory flange body marking; it's derived from the pressure-temp tables."
  },
  {
    id: "rev2-21",
    text: "(21) All planned, systematic, and preventative actions required to determine if materials, equipment, or services will meet specified requirements so that the piping will perform satisfactorily in-service. Quality assurance plans will specify the necessary quality control activities and examinations?",
    options: [
      "a. Quality control.",
      "b. Quality Manual.",
      "c. Quality assurance.",
      "d. Quality examination."
    ],
    correctAnswer: 2,
    hint: "This is the classic definition of Quality Assurance."
  },
  {
    id: "rev2-22",
    text: "(22) Which method can be used in lieu of PWHT for material P-No. 1, P-No. 3, and P-No. 4 steels?",
    options: [
      "a. Controlled-deposition Welding (CDW) Method",
      "b. Preheat Method",
      "c. Preheat or Controlled-deposition Welding (CDW) Methods",
      "d. None of the above"
    ],
    correctAnswer: 0,
    hint: "API 570 allows CDW as a PWHT alternative under specific conditions."
  },
  {
    id: "rev2-23",
    text: "(23) During Controlled deposition welding (CDW). The preheat temperature shall be checked to assure that on each side of the weld point will be maintained at the minimum Temperature during welding.",
    options: [
      "a. 4 in. (100 mm) of the material or four times the material thickness whichever is greater",
      "b. 4 in. (100 mm) of the material or four times the material thickness whichever is lesser.",
      "c. 2 in. (50 mm) of the material or two times the material thickness whichever is lesser.",
      "d. 2 in. (50 mm) of the material or two times the material thickness whichever is greater."
    ],
    correctAnswer: 0,
    hint: "Standard API 570 requirement: 4 inches or 4t, whichever is greater."
  },
  {
    id: "rev2-24",
    text: "(24) As a default criteria for a pressure-relieving valve being stuck shut, use -- beyond which the valve is classified as stuck shut if it does not pop, and the test is discontinued.",
    options: [
      "a. A max 100 % of set pressure",
      "b. A max 150 % of set pressure",
      "c. A max 200 % of set pressure",
      "d. A max 250 % of set pressure"
    ],
    correctAnswer: 1,
    hint: "A PRV is 'stuck' if it won't open at 1.5x set pressure."
  },
  {
    id: "rev2-25",
    text: "(25) Controlled deposition welding may be used in lieu of PWHT when notch toughness is not required and:",
    options: [
      "a. When the original material is P.No. 1, P-No. 3, and P-No. 4 steels",
      "b. Only when the MDMT of the material is -20°F",
      "c. When the vessel has undergone PWHT",
      "d. When electric resistance coils are not available"
    ],
    correctAnswer: 0,
    hint: "CDW is limited to these specific P-numbers in the API code."
  },
  {
    id: "rev2-26",
    text: "(26) Controlled deposition welding may be used in lieu of PWHT when notch toughness is not required and:",
    options: [
      "a. When the original material is P-No. 4 steels",
      "b. Only when the MDMT of the material is -20 °F",
      "c. When the vessel has undergone PWHT",
      "d. When electric resistance coils are not available"
    ],
    correctAnswer: 0,
    hint: "This is a variant of the previous question; P-No. 4 is included in the list."
  },
  {
    id: "rev2-27",
    text: "(27) What is the maximum interpass temperature when using the preheat alternative method for a weld repair on a vessel that originally had PWHT?",
    options: [
      "a. 300°F (150°C)",
      "b. 400°F (205°C)",
      "c. 500°F (260°C)",
      "d. 600°F (315°C)"
    ],
    correctAnswer: 2,
    hint: "500°F is the interpass ceiling to avoid material degradation during the repair."
  },
  {
    id: "rev2-28",
    text: "(28) Which of these is correct regarding Preheating Method temps to be maintained as specified in a WPS, when preheating is used as an alternative in lieu of PWHT?",
    options: [
      "a. Preheat of 300°F (150°C) or higher, with interpass temps not exceeding 500°F (260°C)",
      "b. Preheat of 300°F (150°C) or higher, with interpass temps not exceeding 600°F (315°C)",
      "c. Preheat of 350°F (177°C) or higher, with interpass temps not exceeding 650°F (343°C)",
      "d. Preheat of 350°F (177°C) or higher, with interpass temps not exceeding 650°F (343°C) (duplicate)"
    ],
    correctAnswer: 1,
    hint: "Interpass temps not exceeding 600°F (315°C) is specified in some alternative WPS."
  },
  {
    id: "rev2-29",
    text: "(29) Records of the welding procedures and welder qualifications used during a repair shall be maintained by the:",
    options: [
      "a. Inspector",
      "b. Owner/user",
      "c. Testing Laboratory",
      "d. Repair Organization"
    ],
    correctAnswer: 3,
    hint: "The repair organization must keep their own qualifying records."
  },
  {
    id: "rev2-30",
    text: "(30) The recommended downstream limit of circuit of an injection point is a minimum of:",
    options: [
      "a. Second change in flow direction past the injection point, or 25 feet beyond the first change in flow direction whichever is less",
      "b. Second change in flow direction past the injection point, or 25 feet beyond the first change in flow direction whichever is greater",
      "c. Second change in flow direction past the injection point, or 25 inches beyond the first change in flow direction whichever is less",
      "d. Second change in flow direction past the injection point, or 25 inches beyond the first change in flow direction whichever is greater"
    ],
    correctAnswer: 0,
    hint: "Injection point circuits extend to the second direction change or 25ft, whichever is less (selective rule)."
  },
  {
    id: "rev2-31",
    text: "(31) API 570 minimum recommended upstream limit of an injection point circuit for inspection purposes is:",
    options: [
      "a. 12 inches as the minimum",
      "b. Three piping diameters as the minimum",
      "c. Lesser of 12 inches or three piping diameters as the minimum",
      "d. None of these"
    ],
    correctAnswer: 0,
    hint: "Upstream limit is 12 inches as the minimum."
  },
  {
    id: "rev2-32",
    text: "(32) What is the weld joint quality factor (Ej) of A53 Type E, electric resistance welded (ERW) pipe?",
    options: [
      "a. 0.6",
      "b. 0.85",
      "c. 0.95",
      "d. 1.00"
    ],
    correctAnswer: 1,
    hint: "ERW pipe has a default joint efficiency of 0.85."
  },
  {
    id: "rev2-33",
    text: "(33) MIC is caused by the corrosive effects of:",
    options: [
      "a. Living organisms",
      "b. The degradation of organisms after they have died",
      "c. Organisms reacting with sulphur",
      "d. Organisms reacting with chlorides"
    ],
    correctAnswer: 0,
    hint: "Microbiologically Induced Corrosion creates acid/damage through living metabolic processes."
  },
  {
    id: "rev2-34",
    text: "(34) When flammable liquid is used for pressure testing, its flash point shall be at least:",
    options: [
      "a. 60°F (15°C)",
      "b. 90°F (32°C)",
      "c. 120°F (49°C)",
      "d. 150°F (65°C)"
    ],
    correctAnswer: 3,
    hint: "High flash points (150°F+) are required for safety during pressure testing."
  },
  {
    id: "rev2-35",
    text: "(35) Sulfidiation of iron-based alloys usually begins at temperatures above:",
    options: [
      "a. 0°F (93°C)",
      "b. 300°F (149°C)",
      "c. 400°F (204°C)",
      "d. 500°F (260°C)"
    ],
    correctAnswer: 3,
    hint: "Sulfidiation is a high-temp mechanism (typically 500°F+)."
  },
  {
    id: "rev2-36",
    text: "(36) The rate of corrosion under insulation will usually not be increased by insulation systems that:",
    options: [
      "a. Contain chloride salts",
      "b. Do not utilize vapor barriers",
      "c. Wick moisture",
      "d. Are made of closed-cell foam glass"
    ],
    correctAnswer: 3,
    hint: "Closed-cell glass doesn't wick/hold moisture against the pipe."
  },
  {
    id: "rev2-37",
    text: "(37) The rate of corrosion under insulation will potentially be lower in insulation systems that:",
    options: [
      "a. Wick moisture.",
      "b. Contain chloride salts.",
      "c. Are made of closed-cell foam glass.",
      "d. Do not utilize vapor barriers."
    ],
    correctAnswer: 2,
    hint: "Non-wicking material like foam glass is safest for CUI prevention."
  },
  {
    id: "rev2-38",
    text: "(38) What are the preferred NDE methods for detecting fatigue cracking?",
    options: [
      "a. Eddy current testing, ultrasonic A-scan testing, and/or possibly hammer testing",
      "b. Liquid penetrant testing, magnetic particle testing and/or possibly acoustic",
      "c. Visual testing, eddy current testing and/or possibly ultrasonic testing.",
      "d. Acoustic emission testing, hydro-testing, and/or possibly ultrasonic testing"
    ],
    correctAnswer: 1,
    hint: "PT/MT are surface methods best for finding fatigue cracks."
  },
  {
    id: "rev2-39",
    text: "(39) The apparent thickness reading obtained from steel walls having elevated temperatures is a factor of about:",
    options: [
      "a. 1% per 55°C (100°F).",
      "b. 2% per 55°C (100°F).",
      "c. 3% per 20°C (68°F).",
      "d. 8% per 460°C (860°F)"
    ],
    correctAnswer: 0,
    hint: "UT velocity changes by ~1% for every 100°F temperature shift."
  },
  {
    id: "rev2-40",
    text: "(40) What type of materials are most resistant to chloride cracking?",
    options: [
      "a. Carbon steels",
      "b. Duplex",
      "c. High nickel-based alloys",
      "d. Austenitic stainless steels"
    ],
    correctAnswer: 2,
    hint: "High nickel alloys (e.g. Inconel) or plain carbon steel are resistant; 300SS is susceptible."
  },
  {
    id: "rev2-41",
    text: "(41) For the purposes of API 570, a piping system not currently in operation due to a process outage is considered to be:",
    options: [
      "a. In-service.",
      "b. Corrosive.",
      "c. Out of service.",
      "d. Blocked off."
    ],
    correctAnswer: 0,
    hint: "API 570 defines 'in-service' as including idle or standalone states if the piping is still part of an operating system."
  },
  {
    id: "rev2-42",
    text: "(42) Sulfidation is known to be accelerated by the presence of:",
    options: [
      "a. Hydrogen.",
      "b. Naphthenic acids.",
      "c. Light hydrocarbons.",
      "d. Moisture."
    ],
    correctAnswer: 1,
    hint: "Naphthenic acid and sulfur compounds together cause aggressive damage."
  },
  {
    id: "rev2-43",
    text: "(43) After a rupture disk has been removed from its holder for inspection, what should happen?",
    options: [
      "a. It should not be reinstalled even if it is not damaged.",
      "b. If it is damaged, it can be cleaned and reinstalled.",
      "c. It should be carefully inspected to check for bulging, scoring, or denting.",
      "d. It should be reinstalled if the manufacturer's installation directions are followed."
    ],
    correctAnswer: 0,
    hint: "Rupture disks are sensitive; removing them can alter their burst setting."
  },
  {
    id: "rev2-44",
    text: "(44) The organization conducting repairs to piping systems shall maintain records of:",
    options: [
      "a. A weld map identifying the welder repairing the defect.",
      "b. Welding procedures and welder performance qualifications.",
      "c. The welding electrodes used and location of the repair in the piping system.",
      "d. Nondestructive examination techniques employed after the repairs are conducted."
    ],
    correctAnswer: 1,
    hint: "WPS and PQR/WPQ are mandatory maintenance records for repair shops."
  },
  {
    id: "rev2-45",
    text: "(45) Atmospheric corrosion rates increase with metal temperature up to about:",
    options: [
      "a. 120°F (49°C).",
      "b. 140°F (60°C).",
      "c. 212°F (100°C).",
      "d. 250°F (121°C)"
    ],
    correctAnswer: 3,
    hint: "Corrosion speeds up as temperature rises, until the surface becomes so dry that water cannot condense (~250°F)."
  },
  {
    id: "rev2-46",
    text: "(46) In assigning a classification to a piping system, the decision should be based primarily on the:",
    options: [
      "a. Probability of corrosion in the process media under pressure.",
      "b. Corrosion histories of similar services in other units.",
      "c. Safety and environmental consequences from leakage.",
      "d. Risk of corrosion in each service."
    ],
    correctAnswer: 2,
    hint: "Consequence of failure dictates the class (1, 2, 3)."
  },
  {
    id: "rev2-47",
    text: "(47) The act of penetrating a thin component with the welding arc while hot tap welding or in-service welding is called:",
    options: [
      "a. Excessive penetration.",
      "b. Burn-through.",
      "c. Arc blow.",
      "d. Melt down."
    ],
    correctAnswer: 1,
    hint: "Burn-through is the critical risk during live welding on pressurized pipe."
  },
  {
    id: "rev2-48",
    text: "(48) If periodic external inspection of buried piping by excavation is required, the piping should be:",
    options: [
      "a. Inspected at one or more locations in lengths of 6 ft. (2.0 m) to 8 ft. (2.5 m) around the full circumference.",
      "b. Uncovered only sufficiently to provide a contact area at the condition monitoring locations (CMLs).",
      "c. Uncovered only sufficiently to inspect the condition of the first foot (300 mm) of pipe and coating.",
      "d. Inspected at one or more locations in lengths of 3 ft. (1.0 m) to 4 ft. (1.3 m) around the full circumference."
    ],
    correctAnswer: 3,
    hint: "3-4 feet is the standard length for selective excavation inspection per API."
  },
  {
    id: "rev2-49",
    text: "(49) Which of the following materials is not susceptible to chloride stress corrosion cracking?",
    options: [
      "a. 8% nickel alloys",
      "b. 400 Series Stainless Steel",
      "c. Hastelloy C276",
      "d. 300 Series Stainless Steel"
    ],
    correctAnswer: 1,
    hint: "400 Series Stainless Steel is generally resistant to chloride stress corrosion cracking compared to 300 series."
  },
  {
    id: "rev2-50",
    text: "(50) Erosion and erosion-corrosion mechanism are characterized by:",
    options: [
      "a. Localized loss of thickness in a non-directional pattern.",
      "b. Generalized thinning in area parallel to the flow of the impact pipe",
      "c. Localized loss of thickness in the form of pits or grooving.",
      "d. Generalized thinning with sharp-edged pitting."
    ],
    correctAnswer: 2,
    hint: "Erosion damage is typically directional, showing horseshoe pits or grooves."
  }
];
