import { Bandage, Heart, UserPlus } from "lucide-react";
import { Button } from "antd";

const services = [
  {
    icon: <Heart color="#d21f3c" size={28} />,
    title: "CPR Help",
    description:
      "Our trained volunteers provide immediate Cardiopulmonary Resuscitation (CPR) assistance in emergencies, helping to save lives when every second counts.",
  },
  {
    icon: <Bandage color="#00c853" size={28} />,
    title: "First Aid Help",
    description:
      "From minor injuries to critical situations, our team offers expert first aid support to stabilize patients and provide care until professional help arrives.",
  },
  {
    icon: <UserPlus color="#6200ea" size={28} />,
    title: "Train Volunteers",
    description:
      "We offer comprehensive training programs to equip volunteers with essential skills in CPR, first aid, and emergency response, building a stronger community.",
  },
];

const Services = () => {
  return (
    <div className="bg-[#f6f7f9] py-16 px-4 text-center">
      <h2 className="text-4xl font-semibold mb-4 text-[#1e1e2f]">
        Our Services
      </h2>
      <p className="max-w-2xl mx-auto mb-12 text-gray-600">
        We’re dedicated to making a difference through compassionate care,
        emergency support, and empowering our community with life-saving skills.
      </p>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 text-left transition hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              {service.icon}
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <a
              href="#"
              className="text-sm text-[#5f2eea] font-medium hover:underline"
            >
              Learn More &nbsp; &rarr;
            </a>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold mb-2 text-[#1e1e2f]">
        Ready to Make a Difference?
      </h3>
      <p className="text-gray-600 mb-6">
        Join us as a volunteer, request help, or learn more about how we can
        support you.
      </p>
      <div className="flex justify-center gap-4">
        <Button type="primary" size="large">
          Become a Volunteer
        </Button>
        <Button size="large">Contact Us</Button>
      </div>
    </div>
  );
};

export default Services;
