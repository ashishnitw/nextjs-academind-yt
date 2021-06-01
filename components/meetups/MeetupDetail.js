import classes from './MeetupDetail.module.css'

function MeetupItemDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt=''></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupItemDetail;