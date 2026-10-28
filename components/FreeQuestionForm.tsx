"use client";

import { FormEvent, useState } from "react";

function makeCaseNumber() {
  return `AJ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export default function FreeQuestionForm() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [step, setStep] = useState<"edit" | "confirm" | "done">("edit");
  const [caseNumber, setCaseNumber] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("confirm");
  }

  function confirmSubmission() {
    setCaseNumber(makeCaseNumber());
    setStep("done");
  }

  if (step === "done") return <section className="form-card confirmation-card" aria-live="polite">
    <div className="confirmation-mark">✓</div><p className="section-kicker">REQUEST RECORDED IN THIS DEMO</p><h2>Thank you, {name}.</h2><p>Your reference number is:</p><p className="case-number">{caseNumber}</p><p>Our usual response time is within <strong>2 days</strong>. We would normally reply by email.</p><p className="notice-box">Demo notice: this website prototype does not send or store your submission. The case number is generated in your browser and is not connected to a support system.</p>
  </section>;

  return <form className="form-card" onSubmit={submit}>
    {step === "edit" ? <>
      <p className="section-kicker">FREE QUESTION FORM</p><h2>What would you like to ask?</h2>
      <label className="field-label" htmlFor="free-name">Your name</label><input id="free-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} placeholder="Enter your name" />
      <label className="field-label" htmlFor="free-question">Your question</label><textarea id="free-question" value={question} onChange={(e) => setQuestion(e.target.value)} required rows={6} maxLength={5000} placeholder="Tell us what you would like to know about Japan..." />
      <p className="form-hint">Free questions are handled by email only. Please do not include sensitive personal information.</p>
      <button className="button button-primary form-submit" type="submit">Review your question <span aria-hidden="true">→</span></button>
    </> : <>
      <p className="section-kicker">CHECK BEFORE SENDING</p><h2>Confirm your question</h2>
      <div className="review-row"><span>Your name</span><strong>{name}</strong></div><div className="review-row review-message"><span>Your question</span><p>{question}</p></div>
      <p>After you confirm, a case number will be shown. The usual reply time is within 2 days.</p>
      <div className="form-actions"><button className="button button-outline" type="button" onClick={() => setStep("edit")}>Edit</button><button className="button button-primary" type="button" onClick={confirmSubmission}>Confirm submission</button></div>
    </>}
  </form>;
}
