const express = require("express");
const request = require("request-promise");
const Xray = require("x-ray");

const app = express();
const PORT = process.env.PORT || 5000;

const xray = new Xray();
app.use(express.json());

app.get("/", (req, res) => {
	var stream = xray(
		"https://www.englishtestsonline.com/english-grammar-mcq-test-with-answers-intermediate-09/",
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
