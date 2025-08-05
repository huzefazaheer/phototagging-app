import DropdownMenu from '../dropdown/dropdown'
import styles from './selector.module.css'

export default function Selector({
  pos,
  showSelector,
  setShowSelector,
  normalizedRef,
  normalizedRadiusRef,
}) {
  return (
    <div
      id="selector"
      className={`${styles.selector} ${
        showSelector ? '' : styles.selectorhidden
      }`}
      style={{ left: pos[0] - 8, top: pos[1] - 8 }}
    >
      <img src="/selector.svg"></img>
      <DropdownMenu
        setShowSelector={setShowSelector}
        normalizedRef={normalizedRef}
        normalizedRadiusRef={normalizedRadiusRef}
      />
    </div>
  )
}
