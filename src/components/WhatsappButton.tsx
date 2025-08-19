import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "918754589759"; // your number
  const message = "Hi, I'm visiting your website and want to chat!";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50 group"
      title="Chat with us on WhatsApp"
    >
      {/* Animated ping effect */}
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
      
      {/* WhatsApp icon */}
      <div className="relative z-10">
        <FaWhatsapp size={28} />
      </div>
      
      {/* Text tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us on WhatsApp
        {/* Arrow */}
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
    </a>
  );
};

export default WhatsappButton; 