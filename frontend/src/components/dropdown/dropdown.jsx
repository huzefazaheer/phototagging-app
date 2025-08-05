import styles from './dropdown.module.css'

export default function DropdownMenu({
  setShowSelector,
  normalizedRef,
  normalizedRadiusRef,
}) {
  return (
    <ul onMouseDown={(e) => e.stopPropagation()} className={styles.dropdown}>
      <li>Select Item</li>
      <li
        onClick={async () => {
          const res = await fetch(
            `http://localhost:8080/tag/1?normalized_radius=${
              normalizedRadiusRef.current
            }&coords=${JSON.stringify(normalizedRef.current)}`,
            {
              credentials: 'include',
            },
          )
          console.log(await res.json())
          setShowSelector(false)
        }}
      >
        Waldo
      </li>
      <li
        onClick={async () => {
          const res = await fetch(
            `http://localhost:8080/tag/2?normalized_radius=${
              normalizedRadiusRef.current
            }&coords=${JSON.stringify(normalizedRef.current)}`,
            {
              credentials: 'include',
            },
          )
          console.log(await res.json())
          setShowSelector(false)
        }}
      >
        Wenda
      </li>
      <li onClick={() => setShowSelector(false)}>Close</li>
    </ul>
  )
}
