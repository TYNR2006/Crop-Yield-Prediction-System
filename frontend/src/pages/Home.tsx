import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Leaf, BarChart3, Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Crop
              </span>
              <br />
              <span className="text-foreground">Yield Prediction</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Use deterministic model-based yield estimates and optional AI advisory guidance for Kadapa-focused crop planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="bg-gradient-primary shadow-soft">
                  Start Prediction
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-accent opacity-10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose CropOptim?</h2>
          <p className="text-lg text-muted-foreground">
            Transparent model outputs with optional advisory support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Yield Prediction",
              description: "Deterministic crop-yield estimates from trained scikit-learn pipelines"
            },
            {
              icon: <Leaf className="h-8 w-8" />,
              title: "Crop Rotation",
              description: "Smart recommendations for sustainable farming"
            },
            {
              icon: <BarChart3 className="h-8 w-8" />,
              title: "Data Analytics",
              description: "Comprehensive insights from soil and climate data"
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Risk Assessment",
              description: "Identify and mitigate potential farming risks"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* CTA Section */}
      <section className="bg-gradient-primary/5 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-4xl mx-auto px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Crops?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Evaluate your own scenario using the available Kadapa dataset features
          </p>
          <Link to="/predict">
            <Button size="lg" className="bg-gradient-primary shadow-soft">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;