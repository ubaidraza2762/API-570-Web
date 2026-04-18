import { Exam } from "../types";
import { API_570_CBQ_AUG_2025 } from "./cbq_questions";
import { API_570_OBQ_AUG_2025 } from "./obq_questions";
import { API_570_CALC_FEB_2025 } from "./calc_questions";
import { API_570_MULTI_AUG_2025 } from "./multi_choice_aug25";
import { API_570_JULY_2024_FINAL } from "./july24_questions";
import { API_570_REV1_FEB_2023 } from "./rev1_feb23_questions";
import { API_570_REV2_FEB_2023 } from "./rev2_feb23_questions";
import { API_570_REV3_FEB_2023 } from "./rev3_feb23_questions";
import { API_570_IMP_OB_SET2 } from "./imp_ob_set2_questions";
import { API_570_IMP_CB_SET2 } from "./imp_cb_set2_questions";
import { API_570_IMQB_CB_SET1 } from "./imqb_cb_set1_questions";
import { API_570_IMQB_OB_SET1 } from "./imqb_ob_set1_questions";
import { API_570_IMQB_OPEN } from "./imqb_open_questions";
import { API_570_PCC2_JAN_26 } from "./pcc2_jan26_questions";
import { API_570_B313_QB_2025 } from "./b313_qb_2025_questions";
import { API_570_QB2_2025 } from "./qb2_2025_questions";
import { API_574_QB_2025 } from "./api_574_qb_2025_questions";
import { API_570_QB1_2025 } from "./qb1_2025_questions"; 
import { API_571_CB_24_QUESTIONS } from "./571_cb_24_questions";
import { API_571_OB_24_QUESTIONS } from "./571_ob_24_questions";
import { API_576_JUNE23_QUESTIONS } from "./576_june23_questions";
import { PCC2_2024_QUESTIONS } from "./pcc2_2024_questions";
import { API_578_QUESTIONS } from "./api_578_questions";
import { API_577_OB_2024_QUESTIONS } from "./577_ob_2024_questions";
import { API_577_CB_2024_QUESTIONS } from "./577_cb_2024_questions";
import { ASME_SEC_V_OB_2024_QUESTIONS } from "./asme_sec_v_ob_2024_questions";
import { ASME_SEC_V_CB_2024_QUESTIONS } from "./asme_sec_v_cb_2024_questions";
import { ASME_SEC_IX_2024_QUESTIONS } from "./asme_sec_ix_2024_questions";
import { B165_QUESTIONS } from "./b165_questions";

// Quick check on line 20: import { API_570_QB1_2025 } from "./data/qb1_2025_questions"; 
// App.tsx uses: import { API_570_QB1_2025 } from "./qb1_2025_questions";
// Since we are in src/data, it should be "./qb1_2025_questions";

export const INITIAL_EXAMS: Exam[] = [
  // Group 1: API 570 Final Exam
  {
    id: "aug25-cbq",
    title: "570 NEW QUS CLOSED BOOK AUG-2025",
    year: "2025",
    category: "Close Book",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_CBQ_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "aug25-obq",
    title: "570 NEW QUS OPEN BOOK AUG-2025",
    year: "2025",
    category: "Open Book",
    bookType: "Open Book",
    duration: 60,
    questions: API_570_OBQ_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "aug25-mcq",
    title: "API 570 MULTI CHOICE QUESTIONS AUG-2025",
    year: "2025",
    category: "MCQ",
    bookType: "Close Book",
    duration: 33,
    questions: API_570_MULTI_AUG_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "july24-final",
    title: "API 570 FINAL EXAM JULY 24",
    year: "2024",
    category: "Final",
    bookType: "Close Book",
    duration: 83,
    questions: API_570_JULY_2024_FINAL,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev3",
    title: "API 570 REVIEW-3 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 60,
    questions: API_570_REV3_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev2",
    title: "API 570 REVIEW-2 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 50,
    questions: API_570_REV2_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "feb25-calc",
    title: "API 570 Calculations FEB-2025",
    year: "2025",
    category: "Calculations",
    bookType: "Open Book",
    duration: 60,
    questions: API_570_CALC_FEB_2025,
    group: "API 570 Final Exam"
  },
  {
    id: "feb23-rev1",
    title: "API 570 REVIEW-1 FEB-2023",
    year: "2023",
    category: "Review",
    bookType: "Close Book",
    duration: 60,
    questions: API_570_REV1_FEB_2023,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-open",
    title: "API 570IMQB OPEN BOOK",
    year: "2023",
    category: "Open Book",
    bookType: "Open Book",
    duration: 50,
    questions: API_570_IMQB_OPEN,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-cb-set1-2021",
    title: "API 570-IMQB-CLOSEBOOK SET-1 2021",
    year: "2021",
    category: "Close Book",
    bookType: "Close Book",
    duration: 83,
    questions: API_570_IMQB_CB_SET1,
    group: "API 570 Final Exam"
  },
  {
    id: "imp-qb-cb-set2",
    title: "API 570 IMP QB-Close Book Set-2",
    year: "2023",
    category: "Close Book",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_IMP_CB_SET2,
    group: "API 570 Final Exam"
  },
  {
    id: "imqb-ob-set1-2021",
    title: "API 570-IMQB-OPENBOOK SET-1 2021",
    year: "2021",
    category: "Open Book",
    bookType: "Open Book",
    duration: 50,
    questions: API_570_IMQB_OB_SET1,
    group: "API 570 Final Exam"
  },
  {
    id: "imp-qb-ob-set2",
    title: "API 570 IMP QB-Open Book Set-2",
    year: "2023",
    category: "Open Book",
    bookType: "Open Book",
    duration: 67,
    questions: API_570_IMP_OB_SET2,
    group: "API 570 Final Exam"
  },

  // Group 2: API 570 Main Code
  {
    id: "pcc2-jan26",
    title: "PCC-2 ADD.QUS JAN-26 For 570",
    year: "2026",
    category: "Add Qus",
    bookType: "Open Book",
    duration: 150,
    questions: API_570_PCC2_JAN_26,
    group: "API 570 Main Code"
  },
  {
    id: "b313-qb-2025",
    title: "ASME B31.3 QB-2025",
    year: "2025",
    category: "QB",
    bookType: "Open Book",
    duration: 83,
    questions: API_570_B313_QB_2025,
    group: "API 570 Main Code"
  },
  {
    id: "qb2-2025",
    title: "API 570 QB-2 2025",
    year: "2025",
    category: "QB",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_QB2_2025,
    group: "API 570 Main Code"
  },
  {
    id: "574-qb-2025",
    title: "API 574 QB-2025 FOR API 570",
    year: "2025",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_574_QB_2025,
    group: "API 570 Main Code"
  },
  {
    id: "qb1-2025",
    title: "API 570 QB-1 2025",
    year: "2025",
    category: "QB",
    bookType: "Close Book",
    duration: 120,
    questions: API_570_QB1_2025,
    group: "API 570 Main Code"
  },
  {
    id: "571-cb-24",
    title: "571 CB-API570-24",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 60,
    questions: API_571_CB_24_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "571-ob-24",
    title: "571 OB-API570-24",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 100,
    questions: API_571_OB_24_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "576-june23",
    title: "API 576 JUNE-23 FOR 570",
    year: "2023",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_576_JUNE23_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "pcc2-2024",
    title: "ASME PCC-2 API 570 2024",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 90,
    questions: PCC2_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "578-510-570",
    title: "API 578-510 570",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 60,
    questions: API_578_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "577-ob-2024",
    title: "577 OB-2024",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 90,
    questions: API_577_OB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "577-cb-2024",
    title: "API 577 CB 2024",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 83,
    questions: API_577_CB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secv-ob-2024",
    title: "ASME SEC-V OB 2024",
    year: "2024",
    category: "Open Book",
    bookType: "Open Book",
    duration: 60,
    questions: ASME_SEC_V_OB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secv-cb-2024",
    title: "ASME SEC- V CB-2024",
    year: "2024",
    category: "Close Book",
    bookType: "Close Book",
    duration: 30,
    questions: ASME_SEC_V_CB_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "secix-2024",
    title: "ASME SEC-IX 2024",
    year: "2024",
    category: "QB",
    bookType: "Open Book",
    duration: 67,
    questions: ASME_SEC_IX_2024_QUESTIONS,
    group: "API 570 Main Code"
  },
  {
    id: "b165",
    title: "B16.5",
    year: "2015",
    category: "Standard",
    bookType: "Open Book",
    duration: 67,
    questions: B165_QUESTIONS,
    group: "API 570 Main Code"
  }
];
