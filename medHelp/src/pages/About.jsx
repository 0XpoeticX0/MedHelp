import { Button, Tag } from "antd";

const teamMembers = [
  {
    name: "Utsho Roy",
    id: "242310005101244",
    role: "Team Leader",
    image: "user1.png", // Replace with real image if available
    linkedin: "#",
  },
  {
    name: "Ashfikur Rahman Mahi",
    id: "242310005101618",
    image: "user2.png",
    linkedin: "#",
  },
  {
    name: "Sourav Paul",
    id: "242310005101956",
    image: "user3.png",
    linkedin: "#",
  },
];

const About = () => {
  return (
    <div className="py-20 px-4 text-center bg-[#f6f7f9]">
      <img
        src="/About-us.png"
        alt="About Us"
        className="mx-auto mb-10 w-full max-w-md sm:max-w-lg md:max-w-xl"
      />

      <h2 className="text-3xl font-bold text-purple-600 mb-4">About Us</h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-12">
        We are a passionate team of 3rd-year students from{" "}
        <strong>Daffodil International University</strong>, committed to
        creating impactful software solutions.
      </p>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="border border-purple-300 rounded-xl p-6 hover:shadow-md transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-purple-600 font-semibold text-lg">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600">{member.id}</p>
            {member.role && (
              <Tag color="purple" className="mt-2">
                {member.role}
              </Tag>
            )}
            <div className="mt-3">
              <Button type="link" href={member.linkedin} target="_blank">
                LinkedIn
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
