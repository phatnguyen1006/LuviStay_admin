import { ReactElement, useState } from "react";
import { Button, message, Steps } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "New Apartment",
    content: "New-apartment",
  },
  {
    title: "Apartment's Room",
    content: "Apartment-room",
  },
  {
    title: "Finish",
    content: "Finish",
  },
];

export default function NewApartment(): ReactElement {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
