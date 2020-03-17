
### Check isSignedIn and respond
```html
<div>
  {this.state.isSignedIn &&
    <div className="animated fadeIn">

    </div>
  }{this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
    <div>
      <br></br>
      <h2 style={{ textAlign: 'center' }}>Access Denied</h2>
    </div>
  }
</div>
```
