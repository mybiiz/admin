import { blue, purple, red, yellow } from '@ant-design/colors'
import { Button, Card } from 'antd'
import React, { useContext } from 'react'

import { AppContext } from '../../App'
import Login from '../Login/Login'

const MainComponent = () => {
  const ctx = useContext(AppContext)

  // console.log("Comntext:", ctx)

  return (
    <>
      {/* {JSON.stringify(ctx?.state)} */}
      {ctx?.state.loggedIn
        ? <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <Card 
              style={{
                borderColor: blue[2]
              }}
            > 
              <div
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <div>
                  This is the admin page main component. Say hello!
                </div>
                <div
                  style={{
                    marginTop: 5,
                    marginBottom: 5
                  }}
                >
                  <Button
                    onClick={e => {
                      alert('Hello clicked!')
                    }}
                    style={{
                      backgroundColor: yellow.primary,
                      borderColor: yellow[6]
                    }}
                  >
                    Hello!
                  </Button>
                  <Button
                    onClick={e => {
                      alert('Hi clicked!')
                    }}
                    type="primary"
                    style={{
                      backgroundColor: purple.primary,
                      borderColor: purple[6]
                    }}
                  >
                    Hi!
                  </Button>
                </div>
              </div>
            </Card>

          </div>
        : <Login />
      }
    </>
  )
}

export default MainComponent