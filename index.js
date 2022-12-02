const express = require("express");
const request = require("request-promise");
const Xray = require("x-ray");

const app = express();
const PORT = process.env.PORT || 5000;

const xray = new Xray();
app.use(express.json());

const baseUrl = "https://www.englishtestsonline.com/";

//this scrapes and gets all types of questions
app.get("/", (req, res) => {
	const stream = xray(
		`${baseUrl}english-grammar-mcq-test-with-answers-intermediate-07/`,
		".mtq_question",
		[
			{
				qNumber: ".mtq_question_label",
				qText: ".mtq_question_text",
				answers: xray(".mtq_clickable", [
					{
						letterButton: ".mtq_css_letter_button",
						trueFalse: ".mtq_marker@alt",
						answerText: ".mtq_answer_text",
					},
				]),
			},
		]
	).stream();
	stream.pipe(res);
});

app.get("/vocabulary", (req, res) => {
	const stream = xray(
		`${baseUrl}conjunctions-and-adverbial-clauses-advanced-level-mcqs-test-with-answers-1/`,
		".mtq_question",
		[
			{
				qNumber: ".mtq_question_label",
				qText: ".mtq_question_text",
				answers: xray(".mtq_clickable", [
					{
						letterButton: ".mtq_css_letter_button",
						trueFalse: ".mtq_marker@alt",
						answerText: ".mtq_answer_text",
					},
				]),
			},
		]
	).stream();
	stream.pipe(res);
});
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
