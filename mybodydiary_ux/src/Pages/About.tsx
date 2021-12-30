const About = (props: any) => {

  const classes = ['tab-component', props.activeTab && 'active']
    .filter(Boolean)
    .join(' ');

  return (
    <>
    <div className={classes}>
      <h2>About</h2>
      <p>Playground made by hongten.</p>
    </div>
    </>
  )
}

export default About