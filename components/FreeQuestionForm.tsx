"use client";

import { FormEvent, useState } from "react";

function makeCaseNumber() {
  return `AJ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export default function FreeQuestionForm() {
  const [email, setEmail] = useState("");
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

  function resetForm() {
  setEmail("");
  setQuestion("");
  setCaseNumber("");
  setStep("edit");
  }

  if (step === "done") return <section className="form-card confirmation-card" aria-live="polite">
    <div className="confirmation-mark">✓</div>
    <p className="section-kicker">REQUEST RECORDED</p>
    <h2>Thank you.</h2>
    <p>Your reference number is:</p>
    <p className="case-number">{caseNumber}</p>
    <p>
      A confirmation email containing your reference number and request details has been sent to your email address.
      Our usual response time is within <strong>2 days</strong>.
    </p>
    <p>
      If you cannot find the email, please check your spam or junk folder.
      If it is still missing, please contact us at <strong><a href="mailto:kaitoselvey@gmail.com">kaitoselvey@gmail.com</a></strong> or <strong>submit a new free request</strong> and include your reference number.
    </p>
    <button className="button button-primary form-submit" type="button" onClick={resetForm}>
      Submit another request <span aria-hidden="true">→</span>
    </button>
  </section>;

  return <form className="form-card" onSubmit={submit}>
    {step === "edit" ? <>
      <p className="section-kicker">FREE QUESTION FORM</p><h2>What would you like to ask?</h2>
      <label className="field-label" htmlFor="free-email">Your email address</label><input id="free-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={100} placeholder="Enter your email address" />
      <label className="field-label" htmlFor="free-question">Your question</label><textarea id="free-question" value={question} onChange={(e) => setQuestion(e.target.value)} required rows={6} maxLength={5000} placeholder="Tell us what you would like to know about Japan..." />
      <p className="form-hint">Free questions are handled by email only. Please do not include sensitive personal information.</p>
      <button className="button button-primary form-submit" type="submit">Review your question <span aria-hidden="true">→</span></button>
    </> : <>
      <p className="section-kicker">CHECK BEFORE SENDING</p><h2>Confirm your question</h2>
      <div className="review-row"><span>Your email address</span><strong>{email}</strong></div><div className="review-row review-message"><span>Your question</span><p>{question}</p></div>
      <p>After you confirm, a case number will be shown. The usual reply time is within 2 days.</p>
      <div className="form-actions"><button className="button button-outline" type="button" onClick={() => setStep("edit")}>Edit</button><button className="button button-primary" type="button" onClick={confirmSubmission}>Confirm submission</button></div>
    </>}
  </form>;
}