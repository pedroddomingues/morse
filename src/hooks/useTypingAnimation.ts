/** This is a fork from https://github.com/jmagrippis/eri/blob/main/src/components/Home/useTypedSuperpower.tsx
 * with state management from parent.
 */
import { useEffect, useState } from "react";

export enum TypePhase {
	Typing,
	Pausing,
	Deleting,
}

export const useTypedAnimation = (
	strings: string[],
	next: boolean,
	setNext: (next: boolean) => void
): {
	typedAnimation: string;
	selectedString: string;
	phase: TypePhase;
} => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [phase, setPhase] = useState(TypePhase.Typing);
	const [typedAnimation, setTypedAnimation] = useState("");

	useEffect(() => {
		switch (phase) {
			case TypePhase.Typing: {
				const nextTypedAnimation = strings[selectedIndex].slice(
					0,
					typedAnimation.length + 1
				);

				if (nextTypedAnimation === typedAnimation) {
					setPhase(TypePhase.Pausing);
					return;
				}

				const timeout = setTimeout(() => {
					setTypedAnimation(nextTypedAnimation);
				}, 5000 / strings[selectedIndex].length);

				return () => clearTimeout(timeout);
			}
			case TypePhase.Deleting: {
				if (!typedAnimation) {
					const timeout = setTimeout(() => {
						const nextIndex = selectedIndex + 1;
						setSelectedIndex(strings[nextIndex] ? nextIndex : 0);
						setPhase(TypePhase.Typing);
					}, 50);
					return () => clearTimeout(timeout);
				}

				const nextRemaining = strings[selectedIndex].slice(
					0,
					typedAnimation.length - 1
				);

				const timeout = setTimeout(() => {
					setTypedAnimation(nextRemaining);
				}, 5000 / strings[selectedIndex].length);

				return () => clearTimeout(timeout);
			}
			case TypePhase.Pausing:
			default:
				if (next) {
					setPhase(TypePhase.Deleting);
					setNext(false);
				}
				return;
		}
	}, [strings, typedAnimation, selectedIndex, phase, next, setNext]);

	return {
		typedAnimation,
		phase,
		selectedString: strings[selectedIndex],
	};
};
