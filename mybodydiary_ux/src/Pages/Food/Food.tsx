import { TabProps } from '../../Components/Tab'

const Food = (props: TabProps) => {
  const classes = ['tab-component', props.activeTab && 'active']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <h2>Food</h2>
    </div>
  )
}

export default Food