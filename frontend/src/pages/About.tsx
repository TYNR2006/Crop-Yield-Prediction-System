import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="bg-gradient-primary bg-clip-text text-transparent">CropOptim</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A student project focused on transparent crop-yield estimation for Kadapa datasets, with optional advisory chat support.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide a reproducible and honest crop-yield estimation workflow that separates measured predictions from advisory LLM responses.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              A world where every farmer has access to intelligent farming solutions, leading to increased food security, 
              reduced environmental impact, and thriving agricultural communities worldwide.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* What We Do */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground">
            CropOptim combines deterministic model inference with optional AI advisory text
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI-Powered Predictions",
              description: "Prediction uses dataset-aligned features (rainfall, temperature, soil type, fertilizer, pesticide, year) and published evaluation scripts."
            },
            {
              title: "Soil Health Analysis",
              description: "Comprehensive soil testing and analysis to understand nutrient levels, pH balance, and organic matter content for optimal crop selection and management."
            },
            {
              title: "Crop Rotation Guidance",
              description: "Intelligent recommendations for crop rotation strategies that improve soil health, reduce pest problems, and maximize long-term farm productivity."
            },
            {
              title: "Climate Insights",
              description: "Weather data integration and climate pattern analysis to help farmers make informed decisions about planting, irrigation, and harvesting timing."
            },
            {
              title: "Sustainable Practices",
              description: "Promoting eco-friendly farming methods that reduce environmental impact while maintaining high productivity and profitability."
            },
            {
              title: "Data-Driven Decisions",
              description: "Transform complex agricultural data into actionable insights that help farmers optimize their operations and increase profitability."
            }
          ].map((item, index) => (
            <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gradient-primary/5 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground">
            Making a difference in agriculture, one farm at a time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Users className="h-8 w-8" />, number: "3", label: "Crops Supported" },
            { icon: <Award className="h-8 w-8" />, number: "100", label: "Rows per Crop Dataset" },
            { icon: <Globe className="h-8 w-8" />, number: "1", label: "District Focus (Kadapa)" },
            { icon: <Target className="h-8 w-8" />, number: "Reproducible", label: "Evaluation Workflow" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;