import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { sendAdvisoryRequest, sendPredictionRequest } from "../api/api";

interface FormData {
  crop: string;
  farmingType: string;
  state: string;
  district: string;
  previousCrop: string;
  year: string;
  rainfall_mm: string;
  avg_temperature_c: string;
  soil_type: string;
  fertilizer_used_kg_per_acre: string;
  pesticide_used_lit_per_acre: string;
}

interface PredictionResponse {
  crop: string;
  prediction: number;
  unit: string;
  model_version: string;
  target: string;
  features_used: string[];
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
}

const CROPS = ["Paddy", "Groundnut", "Millets"];
const STATES = {
  "Andhra Pradesh": ["Kadapa", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
};
const SOIL_TYPES = ["Black", "Loamy", "Red", "Sandy"];

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isAdvisoryLoading, setIsAdvisoryLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [formData, setFormData] = useState<FormData>({
    crop: "",
    farmingType: "",
    state: "Andhra Pradesh",
    district: "Kadapa",
    previousCrop: "",
    year: "2025",
    rainfall_mm: "",
    avg_temperature_c: "",
    soil_type: "",
    fertilizer_used_kg_per_acre: "",
    pesticide_used_lit_per_acre: "",
  });

  const totalSteps = 6;

  const handleChatSubmit = async (message: string) => {
    if (!message.trim() || isAdvisoryLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), content: message, sender: "user" };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsAdvisoryLoading(true);

    try {
      const response = await sendAdvisoryRequest(message);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          content: `Advisory: ${response.advisory}\n\n${response.note}`,
          sender: "bot",
        },
      ]);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Advisory request failed";
      setChatMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-bot`, content: `Advisory unavailable: ${messageText}`, sender: "bot" },
      ]);
    } finally {
      setIsAdvisoryLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsPredicting(true);
    try {
      const payload = {
        crop: formData.crop.toLowerCase(),
        year: formData.year,
        rainfall_mm: formData.rainfall_mm,
        avg_temperature_c: formData.avg_temperature_c,
        soil_type: formData.soil_type,
        fertilizer_used_kg_per_acre: formData.fertilizer_used_kg_per_acre,
        pesticide_used_lit_per_acre: formData.pesticide_used_lit_per_acre,
      };

      const response: PredictionResponse = await sendPredictionRequest(payload);
      navigate("/results", { state: { formData, predictionResult: response } });
    } catch (error) {
      toast({
        title: "Prediction failed",
        description: error instanceof Error ? error.message : "Please verify your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 4 && formData.crop === formData.previousCrop) {
      setShowWarning(true);
      return;
    }
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
    setShowWarning(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.crop !== "";
      case 2:
        return formData.farmingType !== "";
      case 3:
        return formData.state !== "" && formData.district !== "";
      case 4:
        return formData.previousCrop !== "";
      case 5:
        return [
          formData.year,
          formData.rainfall_mm,
          formData.avg_temperature_c,
          formData.soil_type,
          formData.fertilizer_used_kg_per_acre,
          formData.pesticide_used_lit_per_acre,
        ].every((value) => value !== "");
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select crop</h3>
            <Select value={formData.crop} onValueChange={(value) => setFormData({ ...formData, crop: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                {CROPS.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose farming type</h3>
            <RadioGroup value={formData.farmingType} onValueChange={(value) => setFormData({ ...formData, farmingType: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organic" id="organic" />
                <Label htmlFor="organic">Organic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inorganic" id="inorganic" />
                <Label htmlFor="inorganic">Inorganic</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(STATES).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Select value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES[formData.state as keyof typeof STATES]?.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select previous crop</h3>
            <Select value={formData.previousCrop} onValueChange={(value) => setFormData({ ...formData, previousCrop: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose previous crop" />
              </SelectTrigger>
              <SelectContent>
                {CROPS.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showWarning && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertDescription className="text-warning-foreground">
                  <strong>Crop rotation is recommended.</strong> Repeating the same crop can reduce long-term soil health.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Enter prediction inputs (dataset-aligned)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Year</Label>
                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2025" />
              </div>
              <div>
                <Label>Rainfall (mm)</Label>
                <Input value={formData.rainfall_mm} onChange={(e) => setFormData({ ...formData, rainfall_mm: e.target.value })} placeholder="e.g., 780" />
              </div>
              <div>
                <Label>Average Temperature (°C)</Label>
                <Input value={formData.avg_temperature_c} onChange={(e) => setFormData({ ...formData, avg_temperature_c: e.target.value })} placeholder="e.g., 29" />
              </div>
              <div>
                <Label>Soil Type</Label>
                <Select value={formData.soil_type} onValueChange={(value) => setFormData({ ...formData, soil_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOIL_TYPES.map((soilType) => (
                      <SelectItem key={soilType} value={soilType}>
                        {soilType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fertilizer Used (kg/acre)</Label>
                <Input
                  value={formData.fertilizer_used_kg_per_acre}
                  onChange={(e) => setFormData({ ...formData, fertilizer_used_kg_per_acre: e.target.value })}
                  placeholder="e.g., 75"
                />
              </div>
              <div>
                <Label>Pesticide Used (lit/acre)</Label>
                <Input
                  value={formData.pesticide_used_lit_per_acre}
                  onChange={(e) => setFormData({ ...formData, pesticide_used_lit_per_acre: e.target.value })}
                  placeholder="e.g., 2.5"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Optional advisory chat</h3>
            <p className="text-sm text-muted-foreground">
              This chat provides AI-generated farming advice and is separate from deterministic yield prediction.
            </p>

            <div className="bg-background border rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">Ask an optional farming question before submitting.</div>
              ) : (
                chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground shadow-sm"}`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                  </div>
                ))
              )}
              {isAdvisoryLoading && <div className="text-sm text-muted-foreground">Fetching advisory response...</div>}
            </div>

            <div className="flex w-full items-end space-x-2">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a farming advisory question (optional)..."
                className="min-h-[44px] resize-none flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit(chatInput);
                  }
                }}
                disabled={isAdvisoryLoading}
              />
              <Button type="button" size="icon" onClick={() => handleChatSubmit(chatInput)} disabled={!chatInput.trim() || isAdvisoryLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Crop Prediction Form</span>
          <span className="text-sm font-normal text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </CardTitle>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isPredicting}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} className="bg-gradient-primary" disabled={isPredicting || !isStepValid()}>
              {isPredicting ? "Predicting..." : "Get Deterministic Prediction"}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!isStepValid()} className="bg-gradient-primary">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;
