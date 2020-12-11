using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : BaseEntity;
        int Complete();
    }
}
