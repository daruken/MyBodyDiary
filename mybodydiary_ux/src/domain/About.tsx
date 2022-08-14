import { TabProps } from '../components/Tabs'

const About = (props: TabProps) => {
  const classes = ['tab-component', props.activeTab && 'active']
      .filter(Boolean)
      .join(' ');

  return (
    <div className={classes}>
      <h2>About</h2>
      <p>Playground made by hongten.</p>
    </div>
  )
}

export default About