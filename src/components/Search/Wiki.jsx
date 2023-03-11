import './styles/styles.css';
export default function Wiki(props) {
    return(
        <a 
        data-test-id = 'suggestion'
        href = {props.link}
        className = 'wikis'
        style = {{backgroundColor: props.color}}
        target = '_blank'
        rel="noreferrer"> 
                { props.title }
        </a>
    );
}