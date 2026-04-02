import styles from './Card.module.css'

function Card({nome, idade, cidade}) {
    return (
    <div className={styles.card}>
        <h2>Nome: {nome}</h2>
        <p>Idade: {idade}</p>
        <p>Cidade: {cidade}</p>
    </div>
  )
}

export default Card