import MultiStepForm from "@/components/MultiStepForm";

const Predict = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Crop <span className="bg-gradient-primary bg-clip-text text-transparent">Prediction</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Submit dataset-aligned inputs for deterministic crop-yield estimation. Advisory chat is optional and separate.
        </p>
      </div>

      <div className="animate-fade-in">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default Predict;
