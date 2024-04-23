const globalServices = require("../Services/index");


const isValidUserIdFromBody = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (id && id !== "") {
      const user = await globalServices.user.findUserByObjects({ _id: id });
      if (user) {
        next()
      } else {
        return res.status(401).json({
          error: true,
          msg: "user doesn't exist"
        })
      }
    } else {
      return res.status(401).json({
        error: true,
        msg: "id cannot be empty"
      })
    }


  } catch (error) {
    console.log("Error from User MiddleWare ( isValidUserIdFromBody ) ", error.message)
    return res.status(401).json({
      error: true,
      msg: "id is not valid"
    })
  }
}
  const isValidUserIdFromParams = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id && id !== "") {
        const user = await globalServices.user.findUserByObjects({ _id: id });
        if (user) {
          next()
        } else {
          return res.status(401).json({
            error: true,
            msg: "user doesn't exist"
          })
        }
      } else {
        return res.status(401).json({
          error: true,
          msg: "id cannot be empty"
        })
      }
  
  
    } catch (error) {
      console.log("Error from User MiddleWare ( isValidUserIdFromBody ) ", error.message)
      return res.status(401).json({
        error: true,
        msg: "id is not valid"
      })
    }
  }
  const isValidContactIdFromParams = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id && id !== "") {
        const user = await globalServices.contact.findContactById({ _id: id });
        if (user) {
          next()
        } else {
          return res.status(401).json({
            error: true,
            msg: "contact doesn't exist"
          })
        }
      } else {
        return res.status(401).json({
          error: true,
          msg: "id cannot be empty"
        })
      }
  
  
    } catch (error) {
      console.log("Error from User MiddleWare ( isValidContactIdFromParams ) ", error.message)
      return res.status(401).json({
        error: true,
        msg: "id is not valid"
      })
    }
  }
  const isValidVideoIdFromParams = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id && id !== "") {
        const user = await globalServices.video.findVideoById({ _id: id });
        if (user) {
          next()
        } else {
          return res.status(401).json({
            error: true,
            msg: "video doesn't exist"
          })
        }
      } else {
        return res.status(401).json({
          error: true,
          msg: "id cannot be empty"
        })
      }
  
  
    } catch (error) {
      console.log("Error from User MiddleWare ( isValidVideoIdFromParams ) ", error.message)
      return res.status(401).json({
        error: true,
        msg: "id is not valid"
      })
    }
  }
  const isValidVideoIdFromBody = async (req, res, next) => {
    try {
      const { id } = req.body;
      if (id && id !== "") {
        const user = await globalServices.video.findVideoById({ _id: id });
        if (user) {
          next()
        } else {
          return res.status(401).json({
            error: true,
            msg: "video doesn't exist"
          })
        }
      } else {
        return res.status(401).json({
          error: true,
          msg: "id cannot be empty"
        })
      }
  
  
    } catch (error) {
      console.log("Error from User MiddleWare ( isValidVideoIdFromBody ) ", error.message)
      return res.status(401).json({
        error: true,
        msg: "id is not valid"
      })
    }
  }
  const isValidAddedByIdFromBody = async (req, res, next) => {
    try {
      const { added_by } = req.body;
      if (added_by && added_by !== "") {
        const user = await globalServices.user.findUserByObjects({ _id: added_by });
        if (user) {
          next()
        } else {
          return res.status(401).json({
            error: true,
            msg: "user doesn't exist"
          })
        }
      } else {
        return res.status(401).json({
          error: true,
          msg: "added_by id cannot be empty"
        })
      }
  
    } catch (error) {
      console.log("Error from User MiddleWare ( isValidAddedByIdFromBody ) ", error.message)
      return res.status(401).json({
        error: true,
        msg: "added by id is not valid"
      })
    }
  }

  const isValidContactIdFromBody = async (req, res, next) => {
    try {
        const { contactId } = req.body;
        if (contactId && contactId !== "") {
          const contact = await globalServices.contact.findContactByObjects({ _id: contactId });
          if (contact) {
            next()
          } else {
            return res.status(401).json({
              error: true,
              msg: "contact doesn't exist"
            })
          }
        } else {
          return res.status(401).json({
            error: true,
            msg: "contact id cannot be empty"
          })
        }
    
      } catch (error) {
        console.log("Error from User MiddleWare ( isValidContactIdFromBody ) ", error.message)
        return res.status(401).json({
          error: true,
          msg: "contact id is not valid"
        })
      }
  }

module.exports = { isValidUserIdFromBody,isValidAddedByIdFromBody ,isValidContactIdFromBody,isValidContactIdFromParams,isValidUserIdFromParams,isValidVideoIdFromParams,isValidVideoIdFromBody};
