import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner
        label="Loading..."
        size="lg"
        variant="gradient"
        color="primary"
      />
    </div>
  );
};

export default Loader;
