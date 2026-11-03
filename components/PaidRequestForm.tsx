
"use client";

import { FormEvent, useMemo, useState } from "react";

const API_URL = "https://ask-japan-api.kaitoselvey.workers.dev/";

const services = [
  {
    id: "phone",
    name: "Phone Research",
    price: "$10 per facility",
    detail: "Research involving phone calls or direct inquiries.",
  },
  {
    id: "recommendations",
    name: "Local Recommendations",
    price: "$10 per day",
    detail: "Personalized recommendations for places and activities in Japan.",
  },
  {
    id: "transportation",
    name: "Transportation Support",
    price: "$10 per day",
    detail: "Practical guidance to help you navigate transportation in Japan.",
  },
  {
    id: "custom",
    name: "Custom Support",
    price: "Quote on request",
    detail: "Describe the support you would like.",
  },
];

export default function PaidRequestForm() {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDetails, setTravelDetails] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [serviceDetails, setServiceDetails] = useState<
    Record<string, string>
  >({});
  const [budget, setBudget] = useState("");
  const [rush, setRush] = useState(false);

  const [step, setStep] = useState<
    "edit" | "confirm" | "done"
  >("edit");

  const [caseNumber, setCaseNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const chosenServices = useMemo(
    () => services.filter((service) => selected.includes(service.id)),
    [selected]
  );

  function toggleService(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selected.length === 0) {
      window.alert("Please select at least one service.");
      return;
    }

    setError("");
    setStep("confirm");
  }

  async function confirmSubmission() {
    if (submitting) return;

    setSubmitting(true);
    setError("");

    const payload = {
      type: "paid",
      email,
      destination,
      details: travelDetails,

      phone_research: selected.includes("phone")
        ? ["Y", serviceDetails.phone || ""]
        : ["N", ""],

      recommendations: selected.includes("recommendations")
        ? ["Y", serviceDetails.recommendations || ""]
        : ["N", ""],

      transportation: selected.includes("transportation")
        ? ["Y", serviceDetails.transportation || ""]
        : ["N", ""],

      custom: selected.includes("custom")
        ? ["Y", serviceDetails.custom || ""]
        : ["N", ""],

      budget: budget.trim() || "Not specified",
      rush: rush ? "Y" : "N",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.caseNumber) {
        throw new Error(
          data.error || "Failed to submit your request."
        );
      }

      setCaseNumber(data.caseNumber);
      setStep("done");
    } catch (err) {
      console.error("Submission error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setEmail("");
    setDestination("");
    setTravelDetails("");
    setSelected([]);
    setServiceDetails({});
    setBudget("");
    setRush(false);
    setCaseNumber("");
    setError("");
    setSubmitting(false);
    setStep("edit");
  }

  if (step === "done") {
    return (
      <section
        className="form-card confirmation-card"
        aria-live="polite"
      >
        <div className="confirmation-mark">✓</div>
        <p className="section-kicker">REQUEST RECORDED</p>
        <h2>Thank you.</h2>
        <p>Your reference number is:</p>
        <p className="case-number">{caseNumber}</p>

        <p>
          A confirmation email containing your reference number and
          request details has been sent to your email address.
          Our usual response time is within <strong>2 days</strong>
          {rush
            ? ", or within 12 hours for your early-response request."
            : "."}
        </p>

        <p>
          We would normally review your request and contact you by
          email to clarify the scope, availability, and final price
          before any paid work begins.
        </p>

        <p>
          If you cannot find the confirmation email, please check
          your spam or junk folder. If it is still missing, please
          contact us at{" "}
          <strong>
            <a href="mailto:kaitoselvey@gmail.com">
              kaitoselvey@gmail.com
            </a>
          </strong>{" "}
          or submit a{" "}
          <strong>
            <a href="/services/ask">Free Request</a>
          </strong>{" "}
          and include your reference number.
        </p>

        <button
          className="button button-primary form-submit"
          type="button"
          onClick={resetForm}
        >
          Submit another request{" "}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  }

  return (
    <form
      className="form-card paid-form"
      onSubmit={submit}
    >
      {step === "edit" ? (
        <>
          <p className="section-kicker">PAID SUPPORT REQUEST</p>
          <h2>Tell us about your trip</h2>

          <label className="field-label" htmlFor="paid-email">
            Your email address
          </label>
          <input
            id="paid-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={100}
            placeholder="Enter your email address"
          />

          <label className="field-label" htmlFor="destination">
            Travel destination(s) in Japan
          </label>
          <input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            maxLength={500}
            placeholder="e.g. Tokyo, Kyoto, Hokkaido"
          />

          <label className="field-label" htmlFor="travel-details">
            Travel details
          </label>
          <textarea
            id="travel-details"
            value={travelDetails}
            onChange={(e) => setTravelDetails(e.target.value)}
            required
            rows={4}
            maxLength={5000}
            placeholder="Travel dates, interests, group size, questions, and any relevant details..."
          />

          <fieldset className="service-options">
            <legend>
              What kind of support would you like?{" "}
              <span>(Select all that apply)</span>
            </legend>

            {services.map((service) => (
              <div
                className="service-option"
                key={service.id}
              >
                <label className="service-option-main">
                  <input
                    type="checkbox"
                    checked={selected.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                  />

                  <span>
                    <strong>{service.name}</strong>
                    <small>{service.detail}</small>
                  </span>

                  <b>{service.price}</b>
                </label>

                {selected.includes(service.id) && (
                  <div className="service-detail-input">
                    <label
                      className="field-label"
                      htmlFor={`detail-${service.id}`}
                    >
                      Details for {service.name}
                    </label>

                    <textarea
                      id={`detail-${service.id}`}
                      rows={2}
                      value={serviceDetails[service.id] || ""}
                      onChange={(e) =>
                        setServiceDetails((old) => ({
                          ...old,
                          [service.id]: e.target.value,
                        }))
                      }
                      placeholder="What specifically would you like us to do?"
                    />
                  </div>
                )}
              </div>
            ))}
          </fieldset>

          <label className="field-label" htmlFor="budget">
            Your budget for our services (USD)
          </label>
          <input
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            maxLength={200}
            placeholder="e.g. $100–$200, or Undecided"
          />

          <p className="form-hint">
            Not sure yet? You can write “Undecided”.
          </p>

          <div className="rush-option">
            <label>
              <input
                type="checkbox"
                checked={rush}
                onChange={(e) => setRush(e.target.checked)}
              />
              <span>
                <strong>
                  I would like an early response (+$10)
                </strong>
                <small>
                  Usual response: within 2 days. Early response:
                  within 12 hours. This is a response-time request,
                  not a guarantee of service completion.
                </small>
              </span>
            </label>
          </div>

          <p className="form-hint">
            Multiple services may qualify for a discount. Rush fees
            or travel expenses may apply; we will confirm any extra
            charges before you agree.
          </p>

          <button
            className="button button-primary form-submit"
            type="submit"
          >
            Review request{" "}
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : (
        <>
          <p className="section-kicker">CHECK BEFORE SENDING</p>
          <h2>Review your request</h2>

          <div className="review-row">
            <span>Email address</span>
            <strong>{email}</strong>
          </div>

          <div className="review-row">
            <span>Destination</span>
            <strong>{destination}</strong>
          </div>

          <div className="review-row review-message">
            <span>Travel details</span>
            <p>{travelDetails}</p>
          </div>

          <h3 className="review-heading">Selected services</h3>

          {chosenServices.map((service) => (
            <div className="review-row" key={service.id}>
              <span>{service.name}</span>
              <div>
                <strong>{service.price}</strong>
                {serviceDetails[service.id] && (
                  <p>{serviceDetails[service.id]}</p>
                )}
              </div>
            </div>
          ))}

          <div className="review-row">
            <span>Budget</span>
            <strong>{budget.trim() || "Not specified"}</strong>
          </div>

          <div className="review-row">
            <span>Early response</span>
            <strong>
              {rush
                ? "Yes (+$10; within 12 hours)"
                : "No (usual reply within 2 days)"}
            </strong>
          </div>

          <p>
            Confirm to receive a case number. We will normally
            reply within 2 days, or within 12 hours if you selected
            the early-response option.
          </p>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              className="button button-outline"
              type="button"
              disabled={submitting}
              onClick={() => {
                setError("");
                setStep("edit");
              }}
            >
              Edit request
            </button>

            <button
              className="button button-primary"
              type="button"
              disabled={submitting}
              onClick={confirmSubmission}
            >
              {submitting
                ? "Submitting..."
                : "Confirm submission"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
