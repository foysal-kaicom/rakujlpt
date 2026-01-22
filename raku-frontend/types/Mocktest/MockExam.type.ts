
export interface QuestionOption {
  id: number;
  values: string;
  mock_test_question_id: number;
}

export type ParsedOptions = Record<string, string>;

export interface Question {
  id: number;
  proficiency_level: string;
  title: string;
  type: string;
  hints?: string;
  options: QuestionOption;
}

export interface Group {
  type: string;
  group_type: string;
  content: string;
  questions: Question[];
}

export interface ExamSection {
  id: number;
  slug: string;
  title: string;
  module_name: string;
  sample_question: string;
  group: Group[];
}

export interface ModuleQuestionCounts {
  [key: string]: number;
}

export type ModuleWiseScore = Record<string, ModuleStats>;

export interface ExamResult {
  question_set: number;
  per_question_mark: number;
  total_correct: number;
  module_wise_score: ModuleWiseScore;
}
export interface ModuleStats {
  answered: number;
  correct: number;
  wrong: number;
}




// interface QuestionOption {
//   id: number;
//   values: string;
//   mock_test_question_id: number;
//   created_at: string;
//   updated_at: string;
// }

// type ParsedOptions = Record<string, string>;

// interface Question {
//   id: number;
//   proficiency_level: string;
//   title: string;
//   type: string;
//   hints: string;
//   options: QuestionOption;
// }

// interface Group {
//   type: string;
//   group_type: string;
//   content: string;
//   questions: Question[];
// }

// interface ExamSection {
//   id: number;
//   slug: string;
//   title: string;
//   module_name: string;
//   sample_question: string;
//   group: Group[];
// }