const express = require("express");
const request = require("request-promise");
const Xray = require("x-ray");

const app = express();
const PORT = process.env.PORT || 5000;

const xray = new Xray();
app.use(express.json());

//https://www.englishtestsonline.com/elementary-grammar-test-30/
//https://www.englishtestsonline.com/advanced-level-grammar-exercise-mcq-test-20/

const baseUrl = "https://www.englishtestsonline.com/";
const intGrUrl = "english-grammar-mcq-test-with-answers-intermediate-";
const elGrUrl = "elementary-grammar-test-";
const adGrUrl = "advanced-level-grammar-exercise-mcq-test-";

const scraper = (url, res) => {
	const stream = xray(url, ".mtq_question", [
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
	]).stream();
	stream.pipe(res);
};

//this scrapes and gets all types of questions
app.get("/grammar/intermediate", (req, res) => {
	scraper(`${baseUrl}${intGrUrl}07/`, res);
});

app.get("/grammar/easy", (req, res) => {
	scraper(`${baseUrl}${elGrUrl}30/`, res);
});

app.get("/grammar/advanced", (req, res) => {
	scraper(`${baseUrl}${adGrUrl}20/`, res);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
