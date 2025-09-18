import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar onOpenLogin={openLoginModal} />

      {/* Main Content */}
      <main>
        <Hero />
        <InfoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  )
}

export default App
