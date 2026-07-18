import React from "react";

const body = () => {
  return (
    <div className="flex justify-around items-center h-full gap-8">
      <div>
        <h3 className="text-2xl">Hello </h3>
        <h1 className="text-5xl font-bold">I am Manoj Singh</h1>
        <h2 className="text-3xl my-4">A Frontend Developer</h2>

        <p className="w-96">
          I am a passionate frontend developer with expertise in creating
          visually appealing and user-friendly web applications. I specialize in
          HTML, CSS, JavaScript, and popular frameworks like React to build
          responsive and dynamic websites.
        </p>
        <button className="bg-gray-50 text-black h-10 w-24 rounded-full mt-8 hover:rotate-180 transform duration-500">Hire Me</button>
      </div>
      <img src=".\src\assets\IMG_20251010_203207912_HDR.png" alt="manoj" className="max-w-77" />
    </div>
  );
};

export default body;
