import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Leaf, 
  CloudRain, 
  BarChart3, 
  Microscope, 
  RefreshCw, 
  Shield, 
  Smartphone,
  Database,
  AlertTriangle
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Multi-Step Prediction",
      description: "Comprehensive 6-step process that captures all crucial factors affecting crop yield including soil conditions, climate data, and farming practices.",
      benefits: ["Model-based yield estimation", "Risk assessment", "Seasonal planning", "Resource optimization"]
    },
    {
      icon: <Leaf className="h-12 w-12" />,
      title: "Crop Optimization",
      description: "Optional advisory chat for crop planning guidance (separate from deterministic prediction endpoint).",
      benefits: ["Intelligent crop rotation", "Soil health improvement", "Pest reduction", "Sustainable farming"]
    },
    {
      icon: <CloudRain className="h-12 w-12" />,
      title: "Climate Insights",
      description: "Real-time weather data integration and climate pattern analysis to help farmers make informed decisions about planting and harvesting.",
      benefits: ["Weather forecasting", "Irrigation planning", "Harvest timing", "Climate adaptation"]
    },
    {
      icon: <Microscope className="h-12 w-12" />,
      title: "Soil Analysis",
      description: "Comprehensive soil health assessment including pH levels, nutrient content, and organic matter analysis for optimal crop selection.",
      benefits: ["Nutrient management", "pH optimization", "Fertility assessment", "Amendment recommendations"]
    }
  ];

  const additionalFeatures = [
    { icon: <BarChart3 className="h-6 w-6" />, title: "Advanced Analytics", description: "Data-driven insights and visualizations" },
    { icon: <RefreshCw className="h-6 w-6" />, title: "Crop Rotation Alerts", description: "Smart warnings for better farming practices" },
    { icon: <Shield className="h-6 w-6" />, title: "Risk Management", description: "Identify and mitigate potential risks" },
    { icon: <Smartphone className="h-6 w-6" />, title: "Mobile Friendly", description: "Access from anywhere, any device" },
    { icon: <Database className="h-6 w-6" />, title: "Historical Data", description: "Learn from past seasons and trends" },
    { icon: <AlertTriangle className="h-6 w-6" />, title: "Early Warnings", description: "Proactive alerts for optimal decisions" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore how the project provides transparent prediction inputs, model outputs, and optional advisory guidance.
        </p>
        <Link to="/predict">
          <Button size="lg" className="bg-gradient-primary shadow-soft">
            Try It Now
          </Button>
        </Link>
      </section>

      {/* Main Features */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Core Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for intelligent crop management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-strong transition-all duration-300 group">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">
                    Key Benefits:
                  </h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Additional Capabilities</h2>
          <p className="text-lg text-muted-foreground">
            More features to enhance your farming experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-primary/5 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Simple steps to generate a prediction and optional advisory notes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Input Your Data",
              description: "Provide information about your crop, farming type, location, and soil conditions through our easy-to-use multi-step form."
            },
            {
              step: "02", 
              title: "AI Analysis",
              description: "A fitted preprocessing + model pipeline processes your provided inputs and generates a deterministic estimate."
            },
            {
              step: "03",
              title: "Get Recommendations",
              description: "Receive a prediction response from `/api/v1/predict` and optionally ask `/chat` for advisory suggestions."
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-lg">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Crops?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Start your journey towards smarter farming today
        </p>
        <Link to="/predict">
          <Button size="lg" className="bg-gradient-primary shadow-soft">
            Start Prediction Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Features;