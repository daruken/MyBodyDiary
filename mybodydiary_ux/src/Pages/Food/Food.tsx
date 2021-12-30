const Food = (props: any) => {

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