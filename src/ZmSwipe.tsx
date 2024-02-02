import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"
const reset = {
	x: null as number | null,
	y: null as number | null,
}
export interface IZmSwipe {
	className?: string
	media?: string
	classNameOnTouch?: string
	status?: "x" | "y"
	classNameOnUnTouch?: string
}
const ZmSwipe: FC<PropsWithChildren<IZmSwipe>> = ({
	children,
	className,
	media,
	classNameOnTouch,
	status,
	classNameOnUnTouch,
}) => {
	const [params, setParams] = useState(reset)

	const ref = useRef<HTMLDivElement>(null)
	const onTouchStart = (ev: TouchEvent) => {
		const distX = ev.touches[0].clientX
		const distY = ev.touches[0].clientY

		setParams({
			x: distX,
			y: distY,
		})
	}
	const onTouchMove = (ev: TouchEvent) => {
		if (!status || !params.x || !params.y) return
		const distX = ev.touches[0].clientX
		const distY = ev.touches[0].clientY
		const el = ref.current
		const diffX = distX - params.x
		const diffY = distY - params.y
		if (status === "x") {
			if (diffX > 0) {
				el?.classList.remove(`${classNameOnUnTouch}`)
				el?.classList.add(`${classNameOnTouch}`)
			} else {
				el?.classList.remove(`${classNameOnTouch}`)
				el?.classList.add(`${classNameOnUnTouch}`)
			}
		}
		if (status === "y") {
			if (diffY > 0) {
				el?.classList.remove(`${classNameOnUnTouch}`)
				el?.classList.add(`${classNameOnTouch}`)
			} else {
				el?.classList.remove(`${classNameOnTouch}`)
				el?.classList.add(`${classNameOnUnTouch}`)
			}
		}
		setParams(reset)
	}
	const matchMedia = window.matchMedia(media || "")

	useEffect(() => {
		document.addEventListener("touchstart", onTouchStart, false)
		document.addEventListener("touchmove", onTouchMove, false)

		return () => {
			document.removeEventListener("touchstart", onTouchStart, false)
			document.removeEventListener("touchmove", onTouchMove, false)
		}
	}, [
		params.x,
		params.y,
		(matchMedia.media !== "" && matchMedia.matches) || !matchMedia.matches,
	])
	return (
		<div className={`zm-swipe ${className}`} ref={ref}>
			{children}
		</div>
	)
}

export default ZmSwipe
