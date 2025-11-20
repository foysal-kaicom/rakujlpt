import { useState, useEffect, useRef } from "react";

interface AIHintProps {
  hint: string | null;
}

export default function AIHint({ hint }: AIHintProps) {
  const [displayedHint, setDisplayedHint] = useState("");
  
  // Use a ref for the timeout ID for reliable cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use a ref for the current typing index
  const indexRef = useRef(0);

  useEffect(() => {
    // 1. Cleanup previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!hint) {
      setDisplayedHint("");
      return;
    }

    // 2. Reset state and index when a new hint arrives
    setDisplayedHint("");
    indexRef.current = 0; // Initialize the index ref

    const typeNext = () => {
      // Get the current index
      const currentIndex = indexRef.current;

      if (currentIndex < hint.length) {
        // 3. Update the displayed hint using the functional update pattern
        setDisplayedHint((prev) => prev + hint.charAt(currentIndex));
        
        // 4. Increment the index for the next step
        indexRef.current = currentIndex + 1;
        
        // 5. Schedule the next character
        timeoutRef.current = setTimeout(typeNext, 50); // adjust speed
      } else {
        // Typing is complete
        timeoutRef.current = null;
      }
    };

    // Start the typing process
    typeNext();

    // 6. Cleanup function (runs when hint changes or component unmounts)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hint]); // Depend only on hint

  if (!hint) return null;

  return (
    // Use whitespace-pre-wrap to handle line breaks correctly if the hint has them
    <p className="text-gray-700 font-medium whitespace-pre-wrap">{displayedHint}</p>
  );
}