// Context API 及使用场景
// 组件之间通信问题 有些全局的状态 需要很多组件使用 如果所以的组件都是通过一层层传递下会非常麻烦
// 由根结点 提供上下文数据 下面的节点可以通过 Context API 访问数据 不管是那一层都不需要上层节点传 props

const ThemeContext = React.createContext('light'); // 默认值
// 给上下文设置值
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <ThemeButton />
      </ThemeContext>
    )
  }
}
// 使用上下文
function ThemeButton(pops) {
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  )
}

const en = {
  submit: 'Submit',
  cancel: 'Cancel'
}
const zh = {
  submit: '提交',
  cancel: '取消'
}

const LocaleContext = React.createContext(en);

class LocalProvider extends React.Component {
  state = {
    locale: zh
  }
  toggleLocal = () => {
    const locale = this.state.locale === en ? zh : en;
    this.setState({ locale })
  }

  render() {
    return (
      <LocaleContext.Provider value={this.state.locale}>
        <button onClick={this.toggleLocal}}>Switch</button>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

class LocalButtons extends React.Component {
  render() {
    return (
      <LocaleContext.Consumer>
        {locale => (
          <div>
            <button>{locale.submit}</button>
            <button>{locale.cancel}</button>
          </div>
        )}
      </LocaleContext.Consumer>
    )
  }
}
