import { useContext } from 'react'
import styles from './dropdown.module.css'
import { gameHandlerContext } from '../../App'

export default function DropdownMenu({
  setShowSelector,
  normalizedRef,
  normalizedRadiusRef,
}) {
  const { addToast } = useContext(gameHandlerContext)

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
          const data = await res.json()
          if (data?.status) addToast('success', 'Found target 1')
          else addToast('error', 'That is incorrect')
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
          const data = await res.json()
          if (data?.status) addToast('success', 'Found target 2')
          else addToast('error', 'That is incorrect')
          setShowSelector(false)
        }}
      >
        Wenda
      </li>
      <li onClick={() => setShowSelector(false)}>Close</li>
    </ul>
  )
}
