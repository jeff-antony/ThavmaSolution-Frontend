import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

const Location = () => {
  return (
    <section id="location" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <div className="divider-animated"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with us to discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="scroll-reveal">
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-card-foreground mb-8">
                Thavma Solutions
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="service-icon w-10 h-10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      Ernakulam, Kerala, India, 682511<br />
                      We are proudly serving clients across India and globally.
                    </p>
                    <h4 className="font-semibold text-card-foreground mb-1">Branch Office</h4>
                    <p className="text-muted-foreground">
                      H.No :5-90/6/78/A/1<br />
                      Plot No: 78, Survey No. 6/Part, <br />
                      Darga Khalij Khan Village, Kismatpur, <br />
                      Rajendra Nagar, Hyderbad - 500 030
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="service-icon w-10 h-10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">
                      +91 875 458 9759
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="service-icon w-10 h-10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      robert.kalathil@gmail.com
                    </p>
                    <p className="text-muted-foreground">
                      thavmasolutions1@gmail.com
                    </p>
                
                  </div>
                </div>
              </div>

              {/* <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-semibold text-card-foreground mb-4">Business Hours</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;