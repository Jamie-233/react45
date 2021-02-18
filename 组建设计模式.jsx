// 高阶组建 实现一些通用的逻辑 被不同组件使用 但是自身并不包含任何UI的展示
// 接收一个组件作为参数 返回一个组件作为返回值 组件内部有生命周期方法 render方法中并没有新的东西
export default function withTimer(WrappedComponent) {
  return class extends React.Component {
    state = { time: new Date() }

    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        time: new Date()
      })
    }

    render() {
      return <WrappedComponent time={this.state.time} {...this.props} />
    }
  }
}

// 在需要计时器的文件里倒入 withTimer
import withTimer form './withTimer';
export class ChatApp extends React.Component {
  render() {
    return (
      <h2>{this.props.time.toLocaleDateString()}</h2>
    )
  }
}

export default withTimer(ChatApp);

// 函数作为子组件 - 让外部决定如何展示状态 这里指使用 span 标签 在常规的组件复用之外 有些特殊的场景是可以用新的模式解决
//
// 如何渲染 是让用tabselector的人决定的 不是由tabselect来增加功能来适应外部场景
class MyComponent extends React.Component {
  render() {
    return(
      <div>
        {this.props.children('Jenkin')}
      </div>
    )
  }
}

<MyComponent>
  {(name) => (
    <div>{name}</div>
  )}
</MyComponent>


export default class AdvancedTabSelector extends PurComoponent {
  static propTypes = {
    value: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.func,
  }

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => {},
    children: () => {},
  }

  render() {
    const { options, value, onChange } = this.props;
    return (
      <div>
        <ul>
          {
            options.map(opt => {
              <li
                key={opt.value}
                className={`tab-itme ${
                  opt.value === this.props.value ? 'selected' : ''
                }`}
                onClick={() => onChange(opt.value)}
              >
                {opt.name}
              </li>
            })
          }
        </ul>
        {this.props.value && this.props.children(this.props.value)}
      </div>
    )
  }
}

const colors = [
  { name: 'Red', value: 'red'},
  { name: 'Blue', value: 'blue'},
  { name: 'Orange', value: 'orange'},
];

const animals = [
  { name: 'Tiger', value: 'tiger'},
  { name: 'xxx', value: 'xxx'},
  { name: 'xxx', value: 'xxx'},
];

export class AdvancedTabSelectorSample extends PurComoponent {
  state = {
    color: null
  }
  render() {
    return (
      <AdvancedTabSelector
        options={colors}
        value={this.state.value}
        onChange={c => this.setState({color: c})}
      >
        {
          (color) => (
            <span style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              background: color
            }} />
          )
        }
      </AdvancedTabSelector>
    )
  }
}
