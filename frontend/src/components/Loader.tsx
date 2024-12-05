import { useEffect, useRef } from "react";

const Loader = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        const baseRadius = 20;
        const numCircles = 12; // More circles
        let colors = ["#ff5c8d", "#ff9a00", "#49c9a2", "#4e8de4", "#b043f0"];

        let circles = Array.from({ length: numCircles }, (_, i) => ({
            angle: (i * Math.PI * 2) / numCircles,
            colorIndex: i % colors.length,
            radius: baseRadius,
        }));

        const rotationSpeed = Math.PI / 180; // Slower rotation
        const increaseThreshold = Math.PI / 3; // 60 degrees
        const radiusIncrease = 0.3;

        function drawCircles() {
            circles.forEach(circle => {
                const x = centerX + Math.cos(circle.angle) * (baseRadius * 3 + 10);
                const y = centerY + Math.sin(circle.angle) * (baseRadius * 3 + 10);

                ctx!.beginPath();  <p className="text-xl text-black text-center">Loading....</p>
                ctx!.arc(x, y, circle.radius, 0, Math.PI * 2);
                ctx!.fillStyle = colors[circle.colorIndex];
                ctx!.fill();
                ctx!.strokeStyle = "#ffffff";
                ctx!.lineWidth = 2;
                ctx!.stroke();
            });
        }

        function updateCircles() {
            circles.forEach(circle => {
                // Rotate each circle
                circle.angle += rotationSpeed;

                // Increase radius if the angle exceeds 60 degrees
                if (circle.angle > increaseThreshold && circle.angle < increaseThreshold + rotationSpeed) {
                    circle.radius += radiusIncrease;
                }

                // Reset radius back to base after a full circle  <p className="text-xl text-black text-center">Loading....</p>
                if (circle.angle > Math.PI * 2) {
                    circle.angle = 0;
                    circle.radius = baseRadius; // Reset radius for the next cycle
                }
            });
        }

        function animate() {
            ctx!.clearRect(0, 0, width, height);
            drawCircles();
            updateCircles();
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return (
        <div className="flex justify-center items-center bg-gray-200 h-screen w-screen text-center">
            
            <canvas ref={canvasRef}></canvas>
          
        </div>
    );
};

export default Loader;
