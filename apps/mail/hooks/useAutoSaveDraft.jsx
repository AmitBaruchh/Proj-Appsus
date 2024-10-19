const { useEffect, useRef } = React

export function useAutoSaveDraft(isFormVisible, newMail, saveDraft) {
    const intervalIdRef = useRef(null); // Use a ref to keep track of the interval ID

    useEffect(() => {
        console.log('Auto-saving draft triggered');

        if (isFormVisible) {
            intervalIdRef.current = setInterval(() => {
                saveDraft();
            }, 5000); // Auto-save every 5 seconds
        } else if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [isFormVisible, newMail]);
}
