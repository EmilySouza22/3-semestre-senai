import styles from './Card.module.css'

function Card({nome, idade, cidade}) {
    return (
    <div className={styles.card}>
        <h3>Nome: {nome}</h3>
        <h3>Idade: {idade}</h3>
        <h3>Cidade:{cidade}</h3>
    </div>
  )
}

export default Card