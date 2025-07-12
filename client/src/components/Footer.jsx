const Footer = ({ darkMode }) => {
  return (
    <div>
      <footer
        className={`mt-10 py-5 text-center ${
          darkMode ? "text-white bg-black/30" : "text-gray-800 bg-white/70"
        }`}
      >
        &copy; {new Date().getFullYear()}{" "}
        <strong className={`${darkMode ? "text-pink-500" : "text-purple-500"}`}>
          Transcriptify
        </strong>{" "}
        by Samar Abbas
      </footer>
    </div>
  );
};

export default Footer;
